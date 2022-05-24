import React , {Component} from 'react';
import PersistenceController from './Persistence.controller';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import '../assets/css/submissionDetails.css'
const time_ago = require('../utils/timeAgo');

class SubmissionDetails extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            id: "",
            submission: {},
            isLoaded: false,
            newComment: false,
        };
        this.persistenceController = new PersistenceController();
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            this.persistenceController.getRequest('/submissions/'+this.props.id, {})
                .then((response) => {
                    console.log("Response: ", response)
                    this.setState({
                        id: response.id,
                        submission: response,
                        isLoaded: true
                    });
                }).catch(error => {
                    console.log("Error loading submission " + this.props.id + ":", error);
                });
        }
    }

    displayHeart(upvoted) {
        if (!upvoted) return <FaHeart className='like_icon' alt='Downvote'/> 
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
            console.log("before");
            let params =  {
                "text": document.getElementById("text").value
            }
            console.log("after. Params: ", params, ". This state: ", this.state.id);
            //post the new reply
            this.persistenceController.postRequest("/submissions/"+this.state.id+"/comments", params)
                .then(response => {
                    console.log("HOLAA")
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
                                <div className='heart'>
                                    {this.displayHeart(this.state.submission.upvoted)}
                                </div>
                                <div>
                                    {this.state.submission.points}
                                </div>
                        </div>
                        <div className='subInfo'>
                            <div className='titleDiv'>
                                <h3>{this.state.submission.title}</h3>
                            </div>                        
                            {this.displayText()}
                            {this.displayUrl()}
                            <div className='infoUser'>
                                by <a href={`${this.state.submission.googleId}`}>{this.state.submission.username}</a> | {time_ago(this.state.submission.createdAt)}
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

                </div>
            </div>
            
        )
    }
}

export default SubmissionDetails;