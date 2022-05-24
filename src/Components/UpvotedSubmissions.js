import React from 'react';
import '../assets/css/submissionPage.css';
import SubmissionPage from './SubmissionPage';

class UpvotedSubmissions extends React.Component {
    render() {
        return (
            <SubmissionPage
                author = {this.props.id}
                title = "My Upvoted Submissions"
                data_endpoint = "/users/upvotedSubmissions"
            />
        );
    }
}

export default UpvotedSubmissions;