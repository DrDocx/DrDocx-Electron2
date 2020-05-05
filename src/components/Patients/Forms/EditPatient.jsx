import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientForm from "./PatientForm";
import PatientsService from "../../../services/PatientsService/PatientsService";

class EditPatient extends Component {
    savePatient = (patient) => {
        PatientsService.updatePatient(patient.id, patient).then((response) => {
            this.props.history.push(`/patients/${response.id}`)
        });
    };

    render() {
        return (
            <Fragment>
                <PatientForm patient={this.props.patient} savePatient={this.savePatient} />
            </Fragment>
        );
    }
}

EditPatient.propTypes = {
    patient: PropTypes.object.isRequired
};

export default EditPatient;
