import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';
import '../assets/css/comments.css';
import CommentItem from './CommentItem';
class Comments extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            comments: {},
            isLoaded: false
        };
        this.persistenceController = new PersistenceController();
    }

    componentDidMount() {
      if (!this.state.isLoaded) {
          this.persistenceController.getRequest("/comments/user/108072218470064233500", {})
              .then(response => {
                  this.setState({
                      comments: response,
                      isLoaded: true
                  });
              })
              .catch(error => {
                  console.log("error¿?", error);
              });
      }
  }

    render() {
        const { isLoaded, comments } = this.state;

        if (!isLoaded) {
            return(
                <div className='commentPage'>
                    <h2>Comments</h2>
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
                <h2>Comments</h2>
                <ul className='vertical-scroll'>
                   {comments.map((com) =>
                    <li><CommentItem>{com}</CommentItem>
                    </li>
                  )}
                </ul>
              </div>
            );
        }
    }
}

export default Comments;