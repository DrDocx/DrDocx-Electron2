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
        this.state = {title: this.props.title ?? ""};
    }

    setTitle = (title) => {
        this.setState({title: title});
    };

    render() {
        return (
            <div className="App">
                <Header title={this.state.title}/>
                <Navigator/>
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
