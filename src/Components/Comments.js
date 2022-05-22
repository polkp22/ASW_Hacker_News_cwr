import React, { Component } from 'react';
import '../assets/css/comments.css'


const hardcoded_commentIVAN = 
    {
      "id": "627bedd7b3ff4268ca76766a",
      "googleId": "108072218470064233500",
      "username": "Ivan Jimeno Ramírez",
      "text": "Heyy! That's a new comment :D",
      "points": 0,
      "createdAt": "2022-05-11T17:09:43.549Z",
      "parent": null,
      "submission": "627bceb91ff6b1837bb97681",
      "replies": [
        {
          "id": "627bedfbb3ff4268ca76768f",
          "googleId": "108072218470064233500",
          "username": "Ivan Jimeno Ramírez",
          "text": "Yepaaaa",
          "points": 0,
          "createdAt": "2022-05-11T17:10:19.567Z",
          "parent": "627bedd7b3ff4268ca76766a",
          "submission": "627bceb91ff6b1837bb97681",
          "replies": [],
          "upvoted": false
        }
      ],
      "upvoted": false
    }

class Comments extends Component {
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

            isMobile
        */
        this.state = {
            comment: hardcoded_commentIVAN,
            isLoaded: true,  //hardcoded
            upvoted: hardcoded_commentIVAN.upvoted,
            points: hardcoded_commentIVAN.points
        };
        // this.persistenceController = new PersistenceController();
    }

    replyComment () {

    }

    render() {
        const { isLoaded, comment, upvoted, points } = this.state;
        
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

        const renderComment = () => {
          return(
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
                            <button className='reply_btn' title='Reply' onClick={() => this.replyComment()}>
                                Reply <i class="fa-solid fa-reply" alt='View comments'></i>
                            </button>
                        </div>
                    </div>
                    {/* <p className='date'>{comment.createdAt}</p> */}
                </div>
              </div>
            );
        }

        if (!isLoaded) {
            return(
                <div>Loading...
                <div class="fa-3x">
                    <i class="fas fa-spinner fa-spin"></i>
                </div></div>
            );
        }
        else {
            console.log(comment);
            return(
              <div>
                <h3>Comments</h3>
                <div>{renderComment()}</div>
                {/* <ul>
                   {comments.map((comment) =>
                    <ListItem key={renderComment()} 
                              value={comment} />
                  )}
                </ul> */}
              </div>
            );
        }
    }
}

export default Comments;