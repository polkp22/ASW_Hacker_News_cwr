import React from 'react';
import SubmissionPage from './SubmissionPage';

class Submissions extends React.Component {
    render() {
        return (
            <SubmissionPage
                title = "My Submissions"
                data_endpoint = "/submissions/user/108072218470064233500"
            />
        );
    }
}

export default Submissions;