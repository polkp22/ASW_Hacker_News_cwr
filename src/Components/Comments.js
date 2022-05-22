import React, { Component } from 'react';
import '../assets/css/comments.css';
import CommentItem from './CommentItem';


const hardcoded_commentIVAN = 
    [{
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
    }]

const comsIVAN = [
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
    },
    {
      "id": "627af8251ff6b1837bb974ed",
      "googleId": "108072218470064233500",
      "username": "Ivan Jimeno Ramírez",
      "text": "Festa FIB is better",
      "points": 1,
      "createdAt": "2022-05-10T23:41:25.190Z",
      "parent": null,
      "submission": "627af7761ff6b1837bb974a1",
      "replies": [
        {
          "id": "627af8621ff6b1837bb9755e",
          "googleId": "107232669716225452809",
          "username": "Pol Valencia Luque",
          "text": "Quien no conoce a dios a cualquier santo le reza",
          "points": 1,
          "createdAt": "2022-05-10T23:42:26.562Z",
          "parent": "627af8251ff6b1837bb974ed",
          "submission": "627af7761ff6b1837bb974a1",
          "replies": [
            {
              "id": "627af8af1ff6b1837bb9758a",
              "googleId": "108072218470064233500",
              "username": "Ivan Jimeno Ramírez",
              "text": "Pol Valencià Luke Sky Walker - 11/05/2022",
              "points": 1,
              "createdAt": "2022-05-10T23:43:43.732Z",
              "parent": "627af8621ff6b1837bb9755e",
              "submission": "627af7761ff6b1837bb974a1",
              "replies": [],
              "upvoted": false
            }
          ],
          "upvoted": false
        }
      ],
      "upvoted": false
    },
    {
      "id": "627bce9d1ff6b1837bb9767c",
      "googleId": "108072218470064233500",
      "username": "Ivan Jimeno Ramírez",
      "text": "first comment?",
      "points": 0,
      "createdAt": "2022-05-11T14:56:29.805Z",
      "parent": null,
      "submission": "627bce9d1ff6b1837bb97678",
      "replies": [
        {
          "id": "627bf2c2f3872a073ec4929a",
          "googleId": "114561299952821730049",
          "username": "Júlia Herrera Caba",
          "text": "Yes!",
          "points": 0,
          "createdAt": "2022-05-11T17:30:42.242Z",
          "parent": "627bce9d1ff6b1837bb9767c",
          "submission": "627bce9d1ff6b1837bb97678",
          "replies": [
            {
              "id": "628178a8cc7a52e26456a566",
              "googleId": "111762570033178548754",
              "username": "Carlota Catot Bragós",
              "text": "test",
              "points": 0,
              "createdAt": "2022-05-15T22:03:20.886Z",
              "parent": "627bf2c2f3872a073ec4929a",
              "submission": "627bce9d1ff6b1837bb97678",
              "replies": [
                {
                  "id": "628178b0cc7a52e26456a577",
                  "googleId": "111762570033178548754",
                  "username": "Carlota Catot Bragós",
                  "text": "ok",
                  "points": 0,
                  "createdAt": "2022-05-15T22:03:28.689Z",
                  "parent": "628178a8cc7a52e26456a566",
                  "submission": "627bce9d1ff6b1837bb97678",
                  "replies": [],
                  "upvoted": false
                }
              ],
              "upvoted": false
            }
          ],
          "upvoted": false
        }
      ],
      "upvoted": false
    },
    {
      "id": "627bed42e6354e9549a6fd5e",
      "googleId": "108072218470064233500",
      "username": "Ivan Jimeno Ramírez",
      "text": "Buenas tardes",
      "points": 0,
      "createdAt": "2022-05-11T17:07:14.686Z",
      "parent": null,
      "submission": "626347bb61b3d3a30d2456fb",
      "replies": [],
      "upvoted": false
    },
    {
      "id": "627af82f1ff6b1837bb9750e",
      "googleId": "108072218470064233500",
      "username": "Ivan Jimeno Ramírez",
      "text": "+ Ratio",
      "points": 2,
      "createdAt": "2022-05-10T23:41:35.715Z",
      "parent": null,
      "submission": "627af7761ff6b1837bb974a1",
      "replies": [],
      "upvoted": false
    }
  ]

class Comments extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            comment: hardcoded_commentIVAN,
            comments: comsIVAN,
            isLoaded: true
        };
        // this.persistenceController = new PersistenceController();
    }

    render() {
        const { isLoaded, comment, comments } = this.state;

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
              <div className="commentPage">
                <h2>Comments</h2>
                <ul>
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