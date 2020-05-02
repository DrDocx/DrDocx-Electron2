import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Patients from "../Patients/Patients";
import Fields from "../Fields/Fields";

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Patients}/>
                <Route path="/patients" component={Patients}/>
                <Route path="/fields" component={Fields} />
            </Switch>
        );
    }
}

Main.propTypes = {};

export default Main;
