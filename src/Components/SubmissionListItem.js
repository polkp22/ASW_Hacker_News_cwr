import React from 'react';
import '../assets/css/submissionListItem.css';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {MdOutlineForum} from 'react-icons/md';
import {BiLink} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import time_ago from '../utils/timeAgo';
import PersistenceController from './Persistence.controller';

class SubmissionListItem extends React.Component {
    constructor(props) {
        super(props);
        /*
            Els props han de tenir:
            id
            googleId
            title
            type
            username
            points
            createdAt
            comments
            url (if type==url)
            upvoted

            handleCommentClick
            handleAuthorClick
        */
        this.state = {
            upvoted: props.sub.upvoted,
            points: props.sub.points
        }
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

    render() {
        const subType = this.props.sub.type;
        const subUpvoted = this.state.upvoted;

        const heart_filling = () => {
            if (subUpvoted) return <FaHeart className='like_icon' alt='Downvote'/> 
            return <FaRegHeart className='like_icon' alt='Upvote'/>;
        };
        
        return(
            <div className='submissionListItem'>
                <div className='layoutContent'>
                    <div className='upperContent'>
                        <h4 className="subItemIdx">{this.props.list_index}.</h4>
                        <div className={'like'}>
                            <button className='like_btn' 
                                title={subUpvoted ? 'Downvote' : 'Upvote'} 
                                onClick={()=>this.handleVoteChange(subUpvoted, this.props.sub.id)}>
                                {heart_filling()}
                            </button>
                            <p>{this.state.points}</p>
                        </div>
                        <div className='details'>
                            <h3>{this.props.sub.title}</h3>
                            <p><Link to={"/profile/"+this.props.sub.googleId}>{this.props.sub.username}</Link>, {time_ago(this.props.sub.createdAt)}.</p>
                        </div>
                    </div>
                    <div className='separator'/>
                    <div className='lowerContent'>
                        <a href={this.props.sub.url}><button title='Visit url' style={{visibility: subType === 'url' ? 'visible' : 'hidden'}}>
                            <h4>Visit site</h4>
                            <BiLink className='icon' alt='Visit site'/>
                        </button></a>
                        <Link to={"/submissions/"+this.props.sub.id}>
                            <button title='View comments'>
                                <h4>See comments</h4>
                                <MdOutlineForum className='icon' alt='View comments'/>
                                <p>{this.props.sub.comments}</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmissionListItem;