import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsIndex from "./PatientsIndex";

class Patients extends Component {

    render() {
        const matchPath = this.props.match.path;
        return (
            <Switch>
                <Route exact path={matchPath}>
                    <PatientsIndex />
                </Route>
                <Route path={`${matchPath}/:patientId`}>
                </Route>
            </Switch>
        );
    }
}

Patients.propTypes = {
    match: PropTypes.object.isRequired
};

export default Patients;