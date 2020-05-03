import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from "../Header/Header";
import Navigator from "../Navigator/Navigator";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

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
                <Navigator open={this.state.navigatorOpen}/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    title: PropTypes.string
};

export default App;
