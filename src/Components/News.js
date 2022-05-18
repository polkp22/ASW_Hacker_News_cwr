import React, { Component } from 'react';
import PersistenceController from './Persistence.controller';

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
            this.persistenceController.getRequest("/users/107232669716225452809", "fdc493b6f15250ab0675f56a5c8745f019349751", {})
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

    render() {
        var { isLoaded, news } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {

            return(
                <div className="App">
                    
                    <ul>
                        <li>{news.googleId}</li>
                        <li>{news.username}</li>
                        <li>{news.createdAt}</li>
                        <li>{news.karma}</li>
                        <li>{news.about}</li>
                    </ul>

                </div>
            );
        }
    }
}

export default News;