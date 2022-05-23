import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import '../assets/css/comments.css';
import { Link } from 'react-router-dom';

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

    validateForm() {
        let text = document.getElementById("text").value;
        if (text.trim() === "") {
            alert("Text is required for a reply");
            return false;
        }
        return true;
    }

    replyComment = (event) => {
        //prevent page refresh on submit
        event.preventDefault();
        if (this.validateForm()) {
            let form = event.target;
            //get all the form elements
            let formData = new FormData(form);
            console.log("FORM DATA", formData);
            let params = formData;
            //iterate over the form elements and add them to the params object
            for (let entry of formData.entries()) {
                if (entry[1] !== "") params[entry[0]] = entry[1];
            }
            //post the new reply
            this.persistenceController.postRequest("/comments/"+this.state.comment.id+"/replies", params)
                .then(response => {
                    alert("Comment replied successfully");
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }

    upvoteComment = (event) => {
        //prevent page refresh on submit
        event.preventDefault();
        //update the State
        this.setState({upvoted: true, points: this.state.points+1})
        //upvote the comment
        this.persistenceController.postRequest("/users/"+process.env.HARDCODED_USER_ID+"/upvoteComment/"+this.state.comment.id, {})
        .then(response => {
            console.log(response)
            alert("Comment upvoted successfully");
        })
        .catch(error => {
            console.log("error", error);
        });
    }

    downvoteComment = (event) => {
        //prevent page refresh on submit
        event.preventDefault();
        //update the State
        this.setState({upvoted: false, points: this.state.points-1})
        //downvote the comment
        this.persistenceController.postRequest("/users/"+process.env.HARDCODED_USER_ID+"/downvoteComment/"+this.state.comment.id, {})
        .then(response => {
            alert("Comment downvoted successfully");
        })
        .catch(error => {
            console.log("error", error);
        });
    }

    render() {
        const { comment, replies, upvoted, points, showForm } = this.state;

        const showFormPressed = () => {
            this.setState({showForm: !showForm});
        }

        const heart_filling = () => {
            if (upvoted) return <FaHeart className='like_icon' alt='Downvote'/> 
            return <FaRegHeart className='like_icon' alt='Upvote'/>;
        };

        return(
            <div>
                <div className='comment'>
                    <div className='layoutRow'>  
                        <div className={'like'}>
                            <a href={upvoted ? this.downvoteComment : this.upvoteComment}>
                                <button className='like_btn' 
                                    title={upvoted ? 'Downvote' : 'Upvote'} 
                                    onClick={()=> upvoted 
                                        ? this.setState({upvoted: false, points: this.state.points-1}) 
                                        : this.setState({upvoted: true, points: this.state.points+1})}>
                                    {heart_filling()}
                                </button>
                            </a>
                            <p>{points}</p>
                        </div>
                        <div className='details'>
                            <div className='inDetails1'>
                                <h4><Link to={"/profile/"+comment.googleId}>{comment.username}</Link></h4>
                                <p>{comment.createdAt}</p>
                            </div>
                            <div className='inDetails2'>
                                <p>{comment.text}</p>
                                <button className='reply_btn' title='Reply' onClick={() => showFormPressed()}>
                                    Reply <i class="fa-solid fa-reply" alt='View comments'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {showForm && (
                        <div className='container'>
                            <form onSubmit = "this.replyComment; showFormPressed();">
                                <textarea name="text" id='text' placeholder='Write your reply'></textarea>
                                <input className='reply_btn' type="submit" value="Submit"/>
                            </form>
                        </div>
                    )}
                </div>
                <ul class>
                    {replies.map((rep) =>
                    <li><CommentItem>{rep}</CommentItem></li>
                    )}
                </ul>
            </div>
        );
    }
}

export default CommentItem;