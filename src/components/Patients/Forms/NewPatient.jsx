import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientForm from "./PatientForm";
import Patient from "../../../models/Patient";
import PatientsService from "../../../services/PatientsService/PatientsService";

class NewPatient extends Component {

    savePatient = (patient) => {
        PatientsService.createPatient(patient).then((response) => {
            this.props.history.push(`/patients/${response.id}`);
        });
    };

    render() {
        const patient = Patient.newPatient();
        return (
            <Fragment>
                <PatientForm patient={patient} savePatient={this.savePatient} />
            </Fragment>
        );
    }
}

NewPatient.propTypes = {};

export default NewPatient;
