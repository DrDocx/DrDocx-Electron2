import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import update from 'immutability-helper';
import Patient from "../../../models/Patient";
import {TextField, Container, Typography, Grid, Select, FormControl, MenuItem, InputLabel} from "@material-ui/core";
import FieldValueGroup from "../../../models/FieldValueGroup";
import Button from "@material-ui/core/Button";
import {formStyles} from "../../Form/FormStyles";
import AddFieldGroup from "./AddFieldGroup";

class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {patient: this.props.patient};
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

    render() {
        const savePatientStr = this.state.patient.id === 0 ? "Create Patient" : "Save Patient"
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="left"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    spacing={2}
                >
                    <br/>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="left">New Patient</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Name"/>
                    </Grid>
                    <Grid item xs={12}>
                        <AddFieldGroup />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary">{savePatientStr}</Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

PatientForm.propTypes = {
    patient: PropTypes.object.isRequired,
    savePatient: PropTypes.func.isRequired
};

export default withRouter(PatientForm);
