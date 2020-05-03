import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsIndex from "./PatientsIndex";

class Patients extends Component {

    render() {
        let match = useRouteMatch();
        return (
            <Switch>
                <Route exact path={match.path}>
                    <PatientsIndex />
                </Route>
                <Route path={`${match.path}/:patientId`}>
                </Route>
            </Switch>
        );
    }
}

Patients.propTypes = {};

export default Patients;
