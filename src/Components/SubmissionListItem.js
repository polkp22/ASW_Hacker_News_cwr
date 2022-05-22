import React from 'react';
import '../assets/css/submissionListItem.css';

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

            isMobile

            handleCommentClick
            handleAuthorClick
        */
        this.state = {
            upvoted: props.sub.upvoted,
            points: props.sub.points
        }
    }

    render() {
        const isMobile = this.props.isMobile;
        const subType = this.props.sub.type;
        const subUpvoted = this.state.upvoted;

        const renderUrlButton = () => {
            if (subType === 'url') {
                if (!isMobile) {
                    return <a href={this.props.sub.url}><button title='Visit url'>
                        <img className='icon' src='/assets/img/link_icon.png' alt='Visit url'/>
                    </button></a>;
                } else {
                    return <a href={this.props.sub.url}><button title='Visit url'>
                        <h4>Visit site</h4>
                        <img className='icon' src='/assets/img/link_icon.png' alt='Visit url'/>
                    </button></a>;
                }
            }
            return <br/>;
        }

        const renderUpvoteButton = () => {
            if (subUpvoted) {
                return <a href='#downvote'><button className='like_btn' title='Downvote' onClick={( )=> this.setState({upvoted: false, points: this.state.points-1})}>
                    <img className='like_icon' src='/assets/img/filled_heart_icon.png' alt='Downvote'/>
                </button></a>;
            } else {
                return <a href='#upvote'><button className='like_btn' title='Upvote' onClick={( )=> this.setState({upvoted: true, points: this.state.points+1})}>
                    <img className='like_icon' src='/assets/img/empty_heart_icon.png' alt='Upvote'/>
                </button></a>;
            }
        }

        if (isMobile) {
            return(
                <div className='submissionListItem'>
                    <div className='layoutRowMobile'>  
                        <div className={'like'}>
                            {renderUpvoteButton()}
                            <p>{this.state.points}</p>
                        </div>
                        <div className='details'>
                            <h3>{this.props.sub.title}</h3>
                            <p>{this.props.sub.username}, {this.props.sub.createdAt}.</p>
                        </div>
                    </div>
                    <div className='separator'/>
                    <div className="subBtnsMobile">
                        {renderUrlButton()}
                        <button title='View comments' onClick={() => this.props.handleCommentClick(this.props.sub.id)}>
                            <h4>See comments</h4>
                            <img className='icon' src='/assets/img/comment_icon.png' alt='View comments'/>
                        </button>
                    </div>
                </div>
            )
        } else {
            return(
                <div className='submissionListItem'>
                    <div className='layoutRow'>  
                        <div className={'like'}>
                            {renderUpvoteButton()}
                            <p>{this.state.points}</p>
                        </div>
                        <div className='details'>
                            <h3>{this.props.sub.title}</h3>
                            <p>{this.props.sub.username}, {this.props.sub.createdAt}.</p>
                        </div>
                        <span></span>
                        {renderUrlButton()}
                        <button title='View comments' onClick={() => this.props.handleCommentClick(this.props.sub.id)}>
                            <img className='icon' src='/assets/img/comment_icon.png' alt='View comments'/>
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default SubmissionListItem;