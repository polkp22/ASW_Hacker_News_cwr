import React from 'react';
import '../assets/css/submissionPage.css';
import SubmissionPage from './SubmissionPage';

class UpvotedSubmissions extends React.Component {
    render() {
        return (
            <SubmissionPage
                title = "My Upvoted Submissions"
                data_endpoint = "/users/107232669716225452809/upvotedSubmissions"
            />
        );
    }
}

export default UpvotedSubmissions;