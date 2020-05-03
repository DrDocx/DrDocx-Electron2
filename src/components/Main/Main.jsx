import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Patients from "../Patients/Patients";
import Fields from "../Fields/Fields";
import Link from "@material-ui/core/Link";

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Patients}/>
                    <Route path="/patients" component={Patients}/>
                    <Route path="/fields" component={Fields} />
                </Switch>
            </div>
        );
    }
}

Main.propTypes = {};

export default Main;
