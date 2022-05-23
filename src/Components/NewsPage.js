import React from 'react';
import SubmissionListItem from './SubmissionListItem';
import '../assets/css/submissionPage.css';
import '../assets/css/newsPage.css';
import {IoIosArrowBack, IoIosArrowForward, IoMdCloseCircleOutline} from 'react-icons/io';
import PersistenceController from './Persistence.controller';
import Popup from './Popup';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            more: false,
            submissions: {},
            isLoaded: false,
            buttonPopup: false
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

    validateForm() {
        let title = document.getElementById("title").value;
        if (title.trim() === "") {
            alert("Title is required");
            return false;
        }
        return true;
    }

    handleForm = (event) => {
        //prevent page refresh on submit
        event.preventDefault();
        if (this.validateForm()) {
            let form = event.target;
            //get all the form elements
            let formData = new FormData(form);
            let params = {};
            //iterate over the form elements and add them to the params object
            for (let entry of formData.entries()) {
                if (entry[1] !== "") params[entry[0]] = entry[1];
            }
            //post the new submission
            this.persistenceController.postRequest("/submissions", params)
                .then(response => {
                    this.setState({
                        isLoaded: false,
                        buttonPopup: false
                    })
                    this.loadSubmissionPage();
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
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
                        list_index = {((page-1) * 15) + index+1}
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
                    <div className='newSubmission'>
                        <button onClick={() => {this.setState({buttonPopup: true});}}>
                            <span>New Submission</span>
                        </button>
                    </div>
                    <div className="pageButtons">
                        <button style={{visibility: page > 1 ? 'visible' : 'hidden'}} onClick={()=>this.setState({page: page-1, isLoaded: false})}><IoIosArrowBack /></button>
                        <h4>Page {page}</h4>
                        <button style={{visibility: more ? 'visible' : 'hidden'}} onClick={()=>this.setState({page: page+1, isLoaded: false})}><IoIosArrowForward /></button>
                    </div>
                    <Popup trigger={this.state.buttonPopup}>
                        <button className='close-btn' onClick={() => {this.setState({buttonPopup: false});}}>
                            <IoMdCloseCircleOutline />
                        </button>
                        <div className='formContainer'>
                            <form onSubmit = {this.handleForm}>
                                <div class="row">
                                    <div class="col-25">
                                        <label for="title">Title: *</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" id="title" name="title" placeholder="Insert a title..."/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-25">
                                        <label for="url">Url</label>
                                    </div>
                                    <div class="col-75">
                                        <input type="text" id="url" name="url" placeholder="Url..."/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-25">
                                        <label for="text">Text</label>
                                    </div>
                                    <div class="col-75">
                                        <textarea name="text" rows="4" cols="49"></textarea>
                                    </div>
                                </div>

                                <div class="row">
                                    <input id="submitForm" type="submit" value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </Popup>
                </div>
            );
        }
    }
}

export default News;