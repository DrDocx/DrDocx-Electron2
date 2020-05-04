import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsTable from "./PatientsTable";
import PatientsService from "../../services/PatientsService/PatientsService";

class PatientsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {patients: []};
    }

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
                <PatientsTable patients={this.state.patients}/>
            </div>
        );
    }
}

PatientsIndex.propTypes = {};

export default PatientsIndex;
