import React from 'react';
import SubmissionPage from './SubmissionPage';

class Submissions extends React.Component {
    render() {
        return (
            <SubmissionPage
                author = {this.props.id}
                title = {this.props.session.logged_user === this.props.id ? "My Submissions" : "%username%'s Submissions"}
                data_endpoint = {"/submissions/user/" + this.props.id}
            />
        );
    }
}

export default Submissions;