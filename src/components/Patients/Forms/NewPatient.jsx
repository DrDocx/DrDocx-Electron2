import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientForm from "./PatientForm";
import Patient from "../../../models/Patient";
import PatientsService from "../../../services/PatientsService";
import {withRouter} from "react-router-dom";
import {withSnackbar} from "notistack";

class NewPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.newPatient();
    }

    newPatient = () => {
        Patient.newPatient().then((patient) => {
            this.setState({patient: patient});
        });
    };

    savePatient = (patient) => {
        PatientsService.createPatient(patient).then((response) => {
            this.props.history.push(`/patients/${response.id}`);
            this.props.enqueueSnackbar("Patient successfully created!", {variant: "success"})
        });
    };

    render() {
        return (
            <Fragment>
                {this.state.patient && <PatientForm patient={this.state.patient} savePatient={this.savePatient}/>}
            </Fragment>
        );
    }
}

NewPatient.propTypes = {};

export default withRouter(withSnackbar(NewPatient));
