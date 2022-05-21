import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';

//Styles
import "../assets/css/news.css"

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {},
            isLoaded: false
        };
        this.persistenceController = new PersistenceController();
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            this.persistenceController.getRequest("/users/107232669716225452809", {})
                .then(response => {
                    this.setState({
                        news: response,
                        isLoaded: true
                    });
                })
                .catch(error => {
                    console.log("error¿?", error);
                });
        }
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
                    alert("Submission created successfully");
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }

    render() {
        var { isLoaded, news } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {
            console.log("news: ", news);
            return(

                <div className='container'>
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
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default News;