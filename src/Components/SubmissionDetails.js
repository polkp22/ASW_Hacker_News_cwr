import React , {Component} from 'react';
import PersistenceController from './Persistence.controller';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import CommentItem from './CommentItem';
import { Link } from 'react-router-dom';
import '../assets/css/submissionDetails.css';
import '../assets/css/comments.css';
const time_ago = require('../utils/timeAgo');

class SubmissionDetails extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            id: "",
            submission: {},
            isLoaded: false,
            newComment: false,
            comments: [],
            upvoted: false,
            points: 0
        };
        this.persistenceController = new PersistenceController();
        this.handleVoteChange = (isVoted, id) => {
            if (isVoted) {
                this.persistenceController.postRequest('/users/downvoteSubmission/'+id, {}).catch(
                    // Couldn't reach api endpoint. Undo changes
                    this.setState({upvoted: true, points: this.state.points+1})
                );
                this.setState({upvoted: false, points: this.state.points-1})
            } else {
                this.persistenceController.postRequest('/users/upvoteSubmission/'+id, {}).catch(
                    // Couldn't reach api endpoint. Undo changes
                    this.setState({upvoted: false, points: this.state.points-1})
                );
                this.setState({upvoted: true, points: this.state.points+1})
            }
        }
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            this.persistenceController.getRequest('/submissions/'+this.props.id, {})
                .then((response) => {
                    console.log("Response: ", response)
                    this.setState({
                        id: response.id,
                        submission: response,
                        isLoaded: true,
                        comments: response.comments,
                        upvoted: response.upvoted,
                        points: response.points
                    });
                }).catch(error => {
                    console.log("Error loading submission " + this.props.id + ":", error);
                });
        }
    }

    displayHeart(upvoted) {
        console.log("upvoted: ", upvoted)
        if (upvoted) return <FaHeart className='like_icon' alt='Downvote'/> 
        return <FaRegHeart className='like_icon' alt='Upvote'/>;
    }

    displayText() {
        if (this.state.submission.text) {
            return (
                <div className='infoText'>{this.state.submission.text}</div>
            )
        }
    }

    displayUrl() {
        if (this.state.submission.url) {
            return (
                <div className='infoUrl'><a href={`${this.state.submission.url}`}>{this.state.submission.url}</a></div>
            )
        }
    }

    validateForm() {
        let text = document.getElementById("text").value;
        if (text.trim() === "") {
            alert("Text is required for a comment");
            return false;
        }
        return true;
    }

    handleCommentForm = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            let params =  {
                "text": document.getElementById("text").value
            }
            //post the new reply
            this.persistenceController.postRequest("/submissions/"+this.state.id+"/comments", params)
                .then(response => {
                    let addComment = this.state.submission;
                    addComment.comments.push(response);
                    this.setState({submission: addComment});
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }

    render() {
        return (
            <div className="submissionDetails">
                <div className="submissionDetailsHeader">
                    <h2>Submission details</h2>
                </div>
                <div className="submissionDetailsInfo">
                    <div>
                        <div className='heartAndNum'>
                                <div className='heart' onClick={this.handleUpvote}>
                                    <button 
                                        className='submission_like_btn' 
                                        title={this.state.upvoted ? 'Downvote' : 'Upvote'} 
                                        onClick={()=>this.handleVoteChange(this.state.upvoted, this.state.id)}>
                                            {this.displayHeart(this.state.upvoted)}
                                    </button>
                                    
                                </div>
                                <div>
                                    {this.state.points}
                                </div>
                        </div>
                        <div className='subInfo'>
                            <div className='titleDiv'>
                                <h3>{this.state.submission.title}</h3>
                            </div>                        
                            {this.displayText()}
                            {this.displayUrl()}
                            <div className='infoUser'>
                                by <Link to={"/profile/"+this.state.submission.googleId}>{this.state.submission.username}</Link> | {time_ago(this.state.submission.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="newComment">
                    {!this.state.newComment && (
                        <button className='newCommentButton' onClick={() => {this.setState({newComment: !this.state.newComment})}}>
                            Add comment
                        </button>
                    )}
                    {this.state.newComment && (
                        <div className='newCommentForm'>
                            <form onSubmit={this.handleCommentForm}>
                                <textarea name="text" id="text" placeholder='Write your comment' defaultValue={""}></textarea>
                                <div className='formButtons'>
                                    <button className='newCommentButton cancelButton' onClick={() => {this.setState({newComment:false})}}>Cancel</button>
                                    <input type="submit" className="newCommentButton" value="Publish"/>
                                </div>                                    
                            </form>
                        </div>
                    )}
                </div>
                <div className="submissionDetailsComments">
                    <h3>Comments</h3>
                    <ul className='submissions-vertical-scroll'>
                        {this.state.comments.map((com) =>
                            <li><CommentItem session={this.props.session} showReplies={true}>{com}</CommentItem></li>
                        )}
                    </ul>
                </div>
            </div>
            
        )
    }
}

export default SubmissionDetails;