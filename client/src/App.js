import React, {Component} from 'react';
import './App.css';
import ButtonAppBar from './components/Navbar/Navbar';
import BucketLists from './components/BucketLists/BucketLists';
import {Route} from 'react-router-dom';
import IndividualBucket from "./components/IndividualBucket/IndividualBucket";

class App extends Component {

    state = {
        loggedIn: false
    };
    toggleLogin = () => {
        this.setState({loggedIn: !this.state.loggedIn})
    };

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (token) {
            this.setState({loggedIn: true});
        }
    }

    render() {
        return (
            <div className="App">
                <ButtonAppBar toggleLogin={this.toggleLogin} loggedIn={this.state.loggedIn}/>
                {this.state.loggedIn ?
                    <div>
                        <Route exact path={'/'} component={BucketLists}/>
                        <Route path={'/bucketlists/:id'} component={IndividualBucket}/>
                    </div>
                    : null}
            </div>
        );
    }
}

export default App;
