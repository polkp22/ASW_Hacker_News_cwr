import React, { Component } from 'react';
import '../assets/css/comments.css';

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
        // this.persistenceController = new PersistenceController();
    }

    replyComment () {
        
    }

    render() {
        const { comment, replies, upvoted, points, showForm } = this.state;

        const showFormPressed = () => {
            this.setState({showForm: !showForm});
        }

        const renderUpvoteButton = () => {
            if (upvoted) {
                return <a href='#downvote'><button className='like_btn' title='Downvote' onClick={( )=> this.setState({upvoted: false, points: this.state.points-1})}>
                    <i class="fa-solid fa-heart" alt='Downvote'></i>
                </button></a>;
            } else {
                return <a href='#upvote'><button className='like_btn' title='Upvote' onClick={( )=> this.setState({upvoted: true, points: this.state.points+1})}>
                    <i class="fa-regular fa-heart" alt='Upvote'></i>
                </button></a>;
            }
        }

        return(
            <div>
                <div className='comment'>
                    <div className='layoutRow'>  
                        <div className='like'>
                            {renderUpvoteButton()}
                            <p>{points}</p>
                        </div>
                        <div className='details'>
                            <div className='inDetails1'>
                                <h4><a href="user?id=comment.googleId">{comment.username}</a></h4>
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
                            <form onSubmit = {this.replyComment()}>
                                <div className="row">
                                    <textarea name="text" placeholder='Write your reply'></textarea>
                                    <input type="submit" value="Submit"/>
                                </div>
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