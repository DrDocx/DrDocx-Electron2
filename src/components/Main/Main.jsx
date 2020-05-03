import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Patients from "../Patients/Patients";
import Fields from "../Fields/Fields";
import Link from "@material-ui/core/Link";

class Main extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Patients}/>
                    <Route path="/patients" component={Patients}/>
                    <Route path="/fields" component={Fields} />
                </Switch>
            </Fragment>
        );
    }
}

Main.propTypes = {};

export default Main;
