import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsIndex from "./PatientsIndex";
import Patient from "./Patient";
import NewPatient from "./NewPatient";

class Patients extends Component {

    render() {
        const matchPath = this.props.match.path;
        return (
            <Switch>
                <Route exact path={matchPath}>
                    <PatientsIndex/>
                </Route>
                <Route path={`${matchPath}/:patientId(\\d+)`} component={Patient}/>
                <Route path={`${matchPath}/new`} component={NewPatient}/>
            </Switch>
        );
    }
}

Patients.propTypes = {
    match: PropTypes.object.isRequired
};

export default Patients;
