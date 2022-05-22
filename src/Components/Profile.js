import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PersistenceController from './Persistence.controller';
import {RiMenuFill, RiChat4Line} from 'react-icons/ri';

//Styles
import "../assets/css/profile.css"

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            isLoaded: false
        };
        this.persistenceController = new PersistenceController();
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            this.persistenceController.getRequest("/users/107232669716225452809", {})
                .then(response => {
                    this.setState({
                        info: response,
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
        var { isLoaded, info } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {
            console.log("info: ", info);
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
                    <div className='profileInfo'>
                        <div className='username'><span className='profileTitle'>@juliahc</span></div>
                        <div className='userData'>
                            <div className='userInfo'>
                                <div>
                                    <div className='userDataTitle'><span className='profileTitle'>Profile info</span></div>
                                    <div className='info'>
                                        <div className='infoTag'>Created:</div>
                                        <div className='infoValue'>66 days ago</div>
                                    </div>
                                    <div className='info'>
                                        <div className='infoTag'>Karma:</div>
                                        <div className='infoValue'>1</div>
                                    </div>
                                    <form className='profileForm' onSubmit = {this.handleForm}>
                                        <div className='info infoAbout'>
                                            <div className='infoTag'>About:</div>
                                            <div className='infoValue'><textarea name="about" rows="4" cols="49"></textarea></div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Showdead:</div>
                                            <div className='infoValue'>
                                                <select name="showdead">
                                                    <option value="yes">Yes</option>
                                                    <option value="no">no</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Noprocrast:</div>
                                            <div className='infoValue'>
                                                <select name="noprocrast">
                                                    <option value="yes">Yes</option>
                                                    <option value="no">no</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Maxvisit:</div>
                                            <div className='infoValue'><input type="number" name="maxvisit" value="10"/></div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Minaway:</div>
                                            <div className='infoValue'><input type="number" name="minaway" value="180"/></div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Delay:</div>
                                            <div className='infoValue'><input type="number" name="delay" value="0"/></div>
                                        </div>
                                        <div className='profileButton'>
                                            <input type="submit" value="Update"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='userActivity'>
                                <div>
                                    <div className='userDataTitle'><span className='profileTitle'>Activity</span></div>
                                    <Link to="#" className='activity'>
                                        <div className='activityIcon'><RiMenuFill /></div>
                                        <div className='activityText'>Submissions</div>
                                    </Link>
                                    <Link to="#" className='activity'>
                                        <div className='activityIcon'><RiChat4Line /></div>
                                        <div className='activityText'>Comments</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            );
        }
    }
}

export default Profile;