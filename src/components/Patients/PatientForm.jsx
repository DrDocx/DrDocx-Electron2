import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientsService from "../../services/PatientsService/PatientsService";
import {withRouter} from "react-router-dom";

class PatientForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.patient != null) {
            this.state = {patientId: this.props.patient.id, patient: this.props.patient}
        }
    }

    savePatient = () => {
        if (this.state.patientId == null) {
            PatientsService.createPatient(this.state).then((response) => {
            });
        }
    };

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

PatientForm.propTypes = {
    patient: PropTypes.object
};

export default withRouter(PatientForm);
