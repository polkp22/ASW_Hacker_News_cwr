import React from 'react';
import SubmissionPage from './SubmissionPage';

class Submissions extends React.Component {
    render() {
        return (
            <SubmissionPage
                title = "My Submissions"
                data_endpoint = "/submissions/user/107232669716225452809"
            />
        );
    }
}

export default Submissions;