import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientsService from "../../../services/PatientsService/PatientsService";
import {withRouter} from "react-router-dom";
import update from 'immutability-helper';
import Patient from "../../../models/Patient";
import {TextField, Container, Typography, Grid} from "@material-ui/core";
import FieldValueGroup from "../../../models/FieldValueGroup";

class PatientForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.patient != null) {
            this.state = {patient: new Patient(this.props.patient)}
        } else {
            const patient = Patient.newPatient();
            this.state = {patient: patient};
        }
    }

    newFieldValueGroup = (fieldGroupId) => {
        // May require a promise using then
        const fvg = FieldValueGroup.newFieldValueGroup(fieldGroupId);
        const newPatientState = update(this.state.patient, {
           fieldValueGroups: {$push: [fvg]}
        });
        this.setState({patient: newPatientState});
    };

    setFvgState = (fieldId, newValue) => {

    };

    savePatient = () => {
        if (this.state.patientId == null) {
            PatientsService.createPatient(this.state.patient).then((response) => {
                this.props.history.push(`/patients/${response.id}`);
            });
        } else {
            PatientsService.updatePatient(this.state.patientId, this.state.patient).then((response) => {
                this.props.history.push(`/patients/${response.id}`)
            });
        }
    };

    render() {
        return (
            <Container>
                <Typography variant="h5" align="left">New Patient</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField id="standard-basic" label="Name"/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

PatientForm.propTypes = {
    patient: PropTypes.object
};

export default withRouter(PatientForm);
