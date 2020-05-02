import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from "./components/Header/Header";
import Navigator from "./components/Navigator/Navigator";
import Main from "./components/Main/Main";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title};
    }

    render() {
    return (
        <div className="App">
          <Header title={this.props.title}/>
          <Navigator/>
          <Main/>
        </div>
    );
    }
}

App.propTypes = {
  title: PropTypes.string,
};

export default App;
