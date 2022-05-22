import React from 'react';
import SubmissionListItem from './SubmissionListItem';
import '../assets/css/submissionPage.css';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import PersistenceController from './Persistence.controller';

class SubmissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            more: false,
            submissions: {},
            isLoaded: false
        };
        this.persistenceController = new PersistenceController();
    }

    loadSubmissionPage() {
        console.log("Loading more!");
        const endpoint = 
            this.props.data_endpoint +
            (this.props.data_endpoint.includes('?') ? '&' : '?') +
            "limit=15&offset="+((this.state.page-1)*15);
        if (!this.state.isLoaded) {
            this.persistenceController.getRequest(endpoint, {})
                .then(response => {
                    if (response.sub_page.length > 0) {
                        this.setState({
                            submissions: response.sub_page,
                            more: response.sub_page.length >= 15,
                            isLoaded: true
                        });
                    } else {
                        this.setState({
                            more: false,
                            isLoaded: true
                        });
                    }
                })
                .catch(error => {
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
        if (!this.state.isLoaded) {
            return (
                <div className="subPage">
                    <h2> {this.props.title} </h2>
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
                    <h2> {this.props.title} </h2>
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