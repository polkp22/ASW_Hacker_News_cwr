import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';
import '../assets/css/comments.css';
import CommentItem from './CommentItem';
class UpvotedComments extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: "Someone",
            upvotedComments: {},
            isLoaded: false
        };
        this.persistenceController = new PersistenceController();
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            Promise.all([
                this.persistenceController.getRequest('/users/'+this.props.id, {}),
                this.persistenceController.getRequest('/users/upvotedComments', {})
            ]).then(([user, response]) => {
                console.log("THE USER IS: ",user)
                console.log("RESPONSE:  ", response.comment_list)
                this.setState({
                    username: user.username,
                    upvotedComments: response.comment_list,
                    isLoaded: true
                });
            }).catch(error => {
                console.log("Error loading upvoted comments from " + this.props.id + ":", error);
            });
        }
    }

    render() {
        const { isLoaded, upvotedComments } = this.state;
        const page_title = "My Upvoted Comments";

        if (!isLoaded) {
            return(
                <div className='commentPage'>
                    <h2>{page_title}</h2>
                    <div>
                        <h4>Loading...</h4>
                        <div class="fa-3x">
                            <i class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
              <div className='commentPage'>
                <h2>{page_title}</h2>
                <ul className='vertical-scroll'>
                   {upvotedComments.map((upCom) =>
                    <li><CommentItem session={this.props.session} showReplies={false}>{upCom}</CommentItem>
                    </li>
                  )}
                </ul>
              </div>
            );
        }
    }
}

export default UpvotedComments;