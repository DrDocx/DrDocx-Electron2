import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsTable from "./PatientsTable";
import PatientsService from "../../services/PatientsService/PatientsService";

class PatientsIndex extends Component {
    componentDidMount() {
        this.updatePatients();
    }

    updatePatients = () => {
        PatientsService.getPatients().then(patientsResponse => {
            this.setState({ patients: patientsResponse });
        });
    };

    render() {
        return (
            <div>
                <PatientsTable/>
            </div>
        );
    }
}

PatientsIndex.propTypes = {};

export default PatientsIndex;
