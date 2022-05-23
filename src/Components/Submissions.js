import React from 'react';
import SubmissionPage from './SubmissionPage';

class Submissions extends React.Component {
    render() {
        return (
            <SubmissionPage
                title = "My Submissions"
                data_endpoint = {"/submissions/user/" + this.props.id}
            />
        );
    }
}

export default Submissions;