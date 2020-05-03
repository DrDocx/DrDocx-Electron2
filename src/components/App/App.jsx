import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import './App.css';
import Header from "../Header/Header";
import Navigator from "../Navigator/Navigator";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {withStyles} from "@material-ui/core";
import {styles} from "./AppStyle"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title ?? "", navigatorOpen: true};
    }

    setTitle = (title) => {
        this.setState({title: title});
    };

    toggleNavigator = () => {
        this.setState(previousState => ({
                navigatorOpen: !previousState.navigatorOpen
            }
        ));
    };

    render() {
        return (
            <div className="App">
                <Header title={this.state.title} toggleNavigator={this.toggleNavigator}/>
                <Navigator open={this.state.navigatorOpen} toggleNavigator={this.toggleNavigator}/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    title: PropTypes.string
};

export default withStyles(styles)(App);
