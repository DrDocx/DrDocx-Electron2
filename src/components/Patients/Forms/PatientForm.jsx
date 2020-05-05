import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientsService from "../../../services/PatientsService/PatientsService";
import {withRouter} from "react-router-dom";
import update from 'immutability-helper';
import FieldGroupsService from "../../../services/FieldsService/FieldGroupsService";
import Patient from "../../../models/Patient";
import {TextField} from "@material-ui/core";

class PatientForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.patient != null) {
            this.state = {patient: new Patient(this.props.patient)}
        }
        else {
            const patient = Patient.newPatient();
            this.state = {patient: patient};
        }
    }

    newFieldValueGroup = (fieldGroupId) => {

    };

    savePatient = () => {
        if (this.state.patientId == null) {
            PatientsService.createPatient(this.state.patient).then((response) => {
                this.props.history.push(`/patients/${response.id}`);
            });
        }
        else {
            PatientsService.updatePatient(this.state.patientId, this.state.patient).then((response) => {
               this.props.history.push(`/patients/${response.id}`)
            });
        }
    };

    render() {
        return (
            <Fragment>
                <TextField id="standard-basic" label="Name" />
            </Fragment>
        );
    }
}

PatientForm.propTypes = {
    patient: PropTypes.object
};

export default withRouter(PatientForm);
