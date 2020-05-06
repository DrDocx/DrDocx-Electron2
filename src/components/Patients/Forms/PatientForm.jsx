import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import update from 'immutability-helper';
import Patient from "../../../models/Patient";
import {TextField, Container, Typography, Grid, Select, FormControl, MenuItem, InputLabel} from "@material-ui/core";
import FieldValueGroup from "../../../models/FieldValueGroup";
import Button from "@material-ui/core/Button";
import {patientFormStyles} from "./PatientFormStyles";
import AddFieldGroup from "./AddFieldGroup";
import {withSnackbar} from "notistack";
import FieldGroupsService from "../../../services/FieldsService/FieldGroupsService";

class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {patient: this.props.patient};
    }

    componentDidMount() {
        this.getFieldGroupOptions();
    }

    getFieldGroupOptions = () => {
        FieldGroupsService.getFieldGroups().then(fieldGroups => {
            const existingFieldGroupIds = this.state.patient.fieldValueGroups.map(fvg => fvg.fieldGroupId);
            const fieldGroupOptions = fieldGroups.filter(fieldGroup => !existingFieldGroupIds.includes(fieldGroup.id));
            this.setState({fieldGroupOptions: fieldGroupOptions});
        });
    }

    newFieldValueGroup = (fieldGroupId) => {
        if (fieldGroupId === 0) {
            this.props.enqueueSnackbar("You must select a field group to add.", {variant: "error"})
        }
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
        const headerStr = this.state.patient.id === 0 ? "New Patient" : "Update Patient";
        const savePatientStr = this.state.patient.id === 0 ? "Create Patient" : "Save Patient";
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    spacing={2}
                >
                    <br/>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="left">{headerStr}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Name"/>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.fieldGroupOptions &&
                        <AddFieldGroup fieldGroups={this.state.fieldGroupOptions}
                                       createFvg={this.newFieldValueGroup}/>}
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

export default withRouter(withSnackbar(PatientForm));
