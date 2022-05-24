import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';
import {FaHeart, FaRegHeart, FaReply} from 'react-icons/fa';
import '../assets/css/comments.css';
import { Link } from 'react-router-dom';
import time_ago from '../utils/timeAgo';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        /*
            Els props han de tenir:
            id
            googleId
            username
            text
            points
            createdAt
            parent
            submission
            replies: [{reply1, reply2}]
            upvoted
        */
        this.state = {
            comment: props.children,
            upvoted: props.children.upvoted,
            points: props.children.points,
            replies: props.children.replies,
            showForm: false
        };
        this.persistenceController = new PersistenceController();
    }

    validateForm = () => {
        let text = document.getElementById("text").value;
        if (text.trim() === "") {
            alert("Text is required for a reply");
            return false;
        }
        return true;
    }

    showFormPressed = () => {
        this.setState({showForm: !this.state.showForm});
    }

    handleSubmit = (event) => {
        //prevent page refresh on submit
        event.preventDefault();
        if (this.validateForm()) {
            let form = event.target;
            //get all the form elements
            let formData = new FormData(form);
            let params = formData;
            //iterate over the form elements and add them to the params object
            for (let entry of formData.entries()) {
                if (entry[1] !== "") params[entry[0]] = entry[1];
            }
            //post the new reply
            this.persistenceController.postRequest("/comments/"+this.state.comment.id+"/replies", params)
                .then(response => {
                    console.log("Reply submitted successfully!");
                    this.state.replies.push(response);
                    this.showFormPressed();
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }

    voteComment = () => {
        if (this.state.upvoted) {
            //Downvote
            this.setState({upvoted: false, points: this.state.points-1});
            //downvote the comment
            this.persistenceController.postRequest("/users/downvoteComment/"+this.state.comment.id, {})
            .then(response => {
                console.log("Successfully downvoted!");
            })
            .catch(error => {
                console.log("error", error);
            });
        } else {
            //Upvote
            this.setState({upvoted: true, points: this.state.points+1});
            //upvote the comment
            this.persistenceController.postRequest("/users/upvoteComment/"+this.state.comment.id, {})
            .then(response => {
                console.log("Successfully upvoted!");
            })
            .catch(error => {
                console.log("error", error);
            });
        }
    }

    render() {
        const { comment, replies, upvoted, points, showForm } = this.state;

        const heart_filling = () => {
            if (upvoted) return <FaHeart className='like_icon' alt='Downvote'/> 
            return <FaRegHeart className='like_icon' alt='Upvote'/>;
        };

        return(
            <div>
                <div className='comment'>
                    <div className='layoutRow'>  
                        <div className={'like'}>
                            <button className='like_btn' 
                                title={upvoted ? 'Downvote' : 'Upvote'} 
                                onClick={this.voteComment}>
                                {heart_filling()}
                            </button>
                            <p>{points}</p>
                        </div>
                        <div className='details'>
                            <div className='inDetails1'>
                                <h4><Link to={"/profile/"+comment.googleId}>{comment.username}</Link></h4>
                                <p>{time_ago(comment.createdAt)}</p>
                            </div>
                            <div className='inDetails2'>
                                <p>{comment.text}</p>
                                <button className='reply_btn' title='Reply' onClick={this.showFormPressed}>
                                    Reply <FaReply alt='View comments'/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {showForm && (
                        <div className='container'>
                            <form onSubmit = {this.handleSubmit}>
                                <textarea name="text" id='text' placeholder='Write your reply'></textarea>
                                <input type="submit" value="Submit"/>
                            </form>
                        </div>
                    )}
                </div>
                {this.props.showReplies && (
                    <ul className='indexCom'>
                        {replies.map((rep) =>
                        <li><CommentItem session={this.props.session} showReplies={this.props.showReplies}>{rep}</CommentItem></li>
                        )}
                    </ul>
                )}
            </div>
        );
    }
}

export default CommentItem;