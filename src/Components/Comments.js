import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';
import '../assets/css/comments.css';
import CommentItem from './CommentItem';
class Comments extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: "Someone",
            comments: {},
            isLoaded: false
        };
        this.persistenceController = new PersistenceController();
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            Promise.all([
                this.persistenceController.getRequest('/users/'+this.props.id, {}),
                this.persistenceController.getRequest('/comments/user/'+this.props.id, {})
            ]).then(([user, response]) => {
                this.setState({
                    username: user.username,
                    comments: response,
                    isLoaded: true
                });
            }).catch(error => {
                console.log("Error loading comments from " + this.props.id + ":", error);
            });
        }
    }

    render() {
        const { isLoaded, comments } = this.state;
        const page_title = "My Comments";

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
                   {comments.map((com) =>
                    <li><CommentItem session={this.props.session} showReplies={true}>{com}</CommentItem>
                    </li>
                  )}
                </ul>
              </div>
            );
        }
    }
}

export default Comments;