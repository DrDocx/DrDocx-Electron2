import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientForm from "./PatientForm";
import PatientsService from "../../services/PatientsService";
import {withRouter} from "react-router-dom";
import {withSnackbar} from "notistack";

class EditPatient extends Component {
    savePatient = (patient) => {
        PatientsService.updatePatient(patient).then((response) => {
            this.props.updatePatient();
            this.props.history.push(`/patients/${response.id}`)
            this.props.enqueueSnackbar("Patient successfully updated!", {variant: "success"})
        });
    };

    render() {
        return (
            <Fragment>
                {this.props.patient && <PatientForm patient={this.props.patient} savePatient={this.savePatient} />}
            </Fragment>
        );
    }
}

EditPatient.propTypes = {
    patient: PropTypes.object.isRequired,
    updatePatient: PropTypes.func.isRequired
};

export default withRouter(withSnackbar(EditPatient));
