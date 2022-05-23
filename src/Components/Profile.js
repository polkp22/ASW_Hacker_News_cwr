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
            isLoaded: false,
            logged: false,
            id:"",
            about: "",
            maxvisit: "",
            minaway:"",
            delay: ""
        };
        this.persistenceController = new PersistenceController();
    }

    loadProfilePage() {
        let userId = "108072218470064233500"; //logged
        //let userId = "107232669716225452809"; //no logged
        this.persistenceController.getRequest("/users/"+userId, {})
            .then(response => {
                this.setState({
                    info: response,
                    isLoaded: true,
                    logged: ("apiKey" in response) ? true : false,
                    id: userId,
                    about: response.about,
                    maxvisit: response.maxvisit,
                    minaway:response.minaway,
                    delay: response.delay
                });
            })
            .catch(error => {
                console.log("error¿?", error);
            });
    }

    componentDidMount() {
        if (!this.state.isLoaded) this.loadProfilePage();
    }

    componentDidUpdate() {
        if (!this.state.isLoaded) this.loadProfilePage();
    }

    handleForm = (event) => {
        event.preventDefault();
        let form = event.target;
        //get all the form elements
        let formData = new FormData(form);
        let params = {};
        //iterate over the form elements and add them to the params object
        for (let entry of formData.entries()) {
            if (entry[1] !== "") params[entry[0]] = entry[1];
        }
        //post the new submission
        this.persistenceController.putRequest("/users/"+this.state.id, params)
            .then(response => {
                this.setState({
                    info: response,
                    isLoaded: true,
                    about: response.about,
                    maxvisit: response.maxvisit,
                    minaway:response.minaway,
                    delay: response.delay
                });
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    render() {
        var { isLoaded, info, logged } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {
            console.log("info: ", info);
            console.log("is logged?: ", logged)

            const renderOption = (attrib) => {
                let condition = "";
                if (attrib === "showdead") condition = this.state.info.showdead;
                else condition = this.state.info.noprocrast;
                if (condition) {
                    return (
                        <select name={attrib}>
                            <option value="yes" selected>yes</option>
                            <option value="no">no</option>
                        </select>
                    );
                } else {
                    return (
                        <select name={attrib}>
                            <option value="yes">yes</option>
                            <option value="no" selected>no</option>
                        </select>
                    );
                }
            }

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
                        <div className='username'><span className='profileTitle'>{info.username}</span></div>
                        <div className='userData'>
                            <div className='userInfo'>
                                <div>
                                    <div className='userDataTitle'><span className='profileTitle'>Profile info</span></div>
                                    <div className='info'>
                                        <div className='infoTag'>Created:</div>
                                        <div className='infoValue'>{info.createdAt}</div>
                                    </div>
                                    <div className='info'>
                                        <div className='infoTag'>Karma:</div>
                                        <div className='infoValue'>{info.karma}</div>
                                    </div>
                                    <form onSubmit={this.handleForm} className='profileForm'>
                                        <div className='info infoAbout'>
                                            <div className='infoTag'>About:</div>
                                            <div className='infoValue'>
                                                <textarea name="about" rows="4" cols="49" 
                                                    value={this.state.about}
                                                    onChange={(e) => this.setState({about:e.target.value})}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Showdead:</div>
                                            <div className='infoValue'>
                                                {renderOption("showdead")}
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Noprocrast:</div>
                                            <div className='infoValue'>
                                                {renderOption("noprocrast")}
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Maxvisit:</div>
                                            <div className='infoValue'><input type="number" name="maxvisit" value={this.state.maxvisit} onChange={(e) => this.setState({maxvisit: e.target.value})}/></div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Minaway:</div>
                                            <div className='infoValue'><input type="number" name="minaway" value={this.state.minaway} onChange={(e) => this.setState({minaway: e.target.value})}/></div>
                                        </div>
                                        <div className='info'>
                                            <div className='infoTag'>Delay:</div>
                                            <div className='infoValue'><input type="number" name="delay" value={this.state.delay} onChange={(e) => this.setState({delay: e.target.value})}/></div>
                                        </div>
                                        <div className='profileButton'>
                                            <input type="submit" value="Update"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='userActivity' style={{display: logged ? "none" : "flex"}}>
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