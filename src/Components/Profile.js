import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';

//Styles
import "../assets/css/profile.css"

class Profile extends Component {
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
                <div className='container profilecontainer'>
                    <div className='profileHeader'>
                        <div className='profileHeaderGreen'></div>
                        <div className='profileHeaderImage'>
                            <div>
                                <img className='profileImg' src="https://as1.ftcdn.net/v2/jpg/01/88/34/66/1000_F_188346637_7a9h4gqPnag7lekMbJAZNq01MUs7v4Vs.jpg" alt="profile image"/>
                            </div>
                        </div>
                    </div>
                    {/* <form onSubmit = {this.handleForm}>
                        <input type="submit" value="Submit"/>
                    </form> */}
                </div>
            );
        }
    }
}

export default Profile;