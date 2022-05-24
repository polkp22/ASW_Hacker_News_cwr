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
        let text = document.getElementById("newCommentText").value;
        if (text.trim() === "") {
            alert("Text is required for a comment");
            return false;
        }
        return true;
    }

    handleCommentForm = (event) => {
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
                            <form onSubmit={() => this.handleCommentForm()}>
                                <textarea name="text" id="newCommentText" placeholder='Write your comment'></textarea>
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