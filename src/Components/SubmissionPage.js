import React from 'react';
import SubmissionListItem from './SubmissionListItem';
import '../assets/css/submissionPage.css';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import PersistenceController from './Persistence.controller';

class SubmissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Someone",
            page: 1,
            more: false,
            submissions: {},
            isLoaded: false
        };
        this.persistenceController = new PersistenceController();
    }

    loadSubmissionPage() {
        const endpoint = 
            this.props.data_endpoint +
            (this.props.data_endpoint.includes('?') ? '&' : '?') +
            "limit=15&offset="+((this.state.page-1)*15);
        if (!this.state.isLoaded) {
            Promise.all([
                this.persistenceController.getRequest('/users/'+ this.props.author, {}),
                this.persistenceController.getRequest(endpoint, {})
            ]).then(([user, response]) => {
                if (response.sub_page.length > 0) {
                    this.setState({
                        username: user.username,
                        submissions: response.sub_page,
                        more: response.sub_page.length >= 15,
                        isLoaded: true
                    });
                } else {
                    this.setState({
                        username: user.username,
                        more: false,
                        isLoaded: true,
                        submissions: []
                    });
                }
            }).catch(error => {
                console.log("Error loading submissions from " + this.props.data_endpoint + ":", error);
            });
        }
    }

    componentDidMount() {
        this.loadSubmissionPage();
    }

    componentDidUpdate() {
        if (!this.state.isLoaded) this.loadSubmissionPage();
    }

    render() {
        const page_title = this.props.title.replace('%username%', this.state.username);
        if (!this.state.isLoaded) {
            return (
                <div className="subPage">
                    <h2> {page_title} </h2>
                    <h4>Loading...</h4>
                </div>
            )
        } else {
            const page = this.state.page;
            const more = this.state.more;
            let submission_list = this.state.submissions.map((item, index) => {
                return <li key={item.id}>
                    <SubmissionListItem
                        list_index = {index+1}
                        sub = { item }
                        isMobile={false}
                        handleCommentClick={()=>{}}
                        handleAuthorClick={()=>{}}
                    />
                </li>
            });
            return (
                <div className="subPage">
                    <h2> {page_title} </h2>
                    <ul className="vertical-scroll">
                        {submission_list}
                    </ul>
                    <div className="pageButtons">
                        <button style={{visibility: page > 1 ? 'visible' : 'hidden'}} onClick={()=>this.setState({page: page-1, isLoaded: false})}><IoIosArrowBack /></button>
                        <h4>Page {page}</h4>
                        <button style={{visibility: more ? 'visible' : 'hidden'}} onClick={()=>this.setState({page: page+1, isLoaded: false})}><IoIosArrowForward /></button>
                    </div>
                </div>
            );
        }
    }
}

export default SubmissionPage;