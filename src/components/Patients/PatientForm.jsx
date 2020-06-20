import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import update from 'immutability-helper';
import {TextField} from "@material-ui/core";
import FieldValueGroup from "../../models/FieldValueGroup";
import Button from "@material-ui/core/Button";
import AddFieldGroup from "./PatientForm/AddFieldGroup";
import {withSnackbar} from "notistack";
import FieldGroupsService from "../../services/FieldGroupsService";
import FieldValueGroupSection from "./PatientForm/FieldValueGroupForm";
import FieldValueGroupsService from "../../services/FieldValueGroupsService";
import MainContainer from "../common/MainContainer";
import Grid from "@material-ui/core/Grid";

class PatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {patient: this.props.patient, groupsToRemove: []};
    }

    componentDidMount() {
        this.getFieldGroupOptions();
    }

    savePatient = () => {
        if (this.state.groupsToRemove.length !== 0) {
            // noinspection JSIgnoredPromiseFromCall
            FieldValueGroupsService.deleteMultipleFieldValueGroups(this.state.groupsToRemove);
        }
        this.props.savePatient(this.state.patient);
    }

    getFieldGroupOptions = () => {
        FieldGroupsService.getFieldGroups(false, false).then(fieldGroups => {
            const existingFieldGroupIds = this.state.patient.fieldValueGroups.map(fvg => fvg.fieldGroupId);
            const fieldGroupOptions = fieldGroups.filter(fieldGroup => !existingFieldGroupIds.includes(fieldGroup.id));
            this.setState({fieldGroupOptions: fieldGroupOptions});
        });
    }

    newFvg = async (fieldGroupId) => {
        if (fieldGroupId === 0 || fieldGroupId === '') {
            this.props.enqueueSnackbar("You must select a field group to add.", {variant: "error"})
        }
        const fvIndex = this.state.fieldGroupOptions.findIndex(fg => fg.id === fieldGroupId);
        const fvg = await FieldValueGroup.newFieldValueGroup(fieldGroupId);
        const newState = update(this.state, {
            patient: {fieldValueGroups: {$push: [fvg]}},
            fieldGroupOptions: {$splice: [[fvIndex, 1]]}
        });
        this.setState(newState);
    };

    modifyFvg = (fieldValueGroup) => {
        const fvgIndex = this.state.patient.fieldValueGroups.findIndex(fvg => fvg.fieldGroupId === fieldValueGroup.fieldGroupId);
        if (fvgIndex < 0) {
            return;
        }
        const newPatientState = update(this.state.patient, {
            fieldValueGroups: {$splice: [[fvgIndex, 1, fieldValueGroup]]}
        });
        this.setState({patient: newPatientState});
    };

    removeFvg = (fieldGroupId) => {
        const fvgToRemoveIndex = this.state.patient.fieldValueGroups.findIndex(fvg => fvg.fieldGroupId === fieldGroupId);
        const fvgToRemove = this.state.patient.fieldValueGroups[fvgToRemoveIndex];
        const fvgToDeleteFromDb = fvgToRemove.id !== 0 ? [fvgToRemove] : [];
        const newState = update(this.state, {
            patient: {fieldValueGroups: {$splice: [[fvgToRemoveIndex, 1]]}},
            groupsToRemove: {$push: fvgToDeleteFromDb},
            fieldGroupOptions: {$push: [fvgToRemove.fieldGroup]}
        });
        this.setState(newState);
    };

    changeName = (event) => {
        const newPatientState = update(this.state.patient, {
            name: {$set: event.target.value}
        });
        this.setState({patient: newPatientState});
    };

    render() {
        const headerStr = this.state.patient.id === 0 ? "New Patient" : "Update Patient";
        const savePatientStr = this.state.patient.id === 0 ? "Create Patient" : "Save Patient";
        return (
            <Fragment>
                <MainContainer title={headerStr}>
                    <Grid container alignItems="flex-start" alignContent={"flex-start"} style={{width: "600px"}}>
                        <TextField onChange={event => this.changeName(event)} value={this.state.patient.name}
                                   label="Name"/>
                    </Grid>
                    {this.state.patient.fieldValueGroups.map(fvg =>
                        <FieldValueGroupSection key={fvg.fieldGroupId} fieldValueGroup={fvg}
                                                setFvgState={this.modifyFvg}
                                                removeFvg={this.removeFvg}/>
                    )}
                    {/*<Grid container direction="column" alignItems="flex-start" alignContent={"flex-start"} style={{width: "600px"}} spacing={1}>*/}
                    {/*    <Grid item>*/}
                        {this.state.fieldGroupOptions &&
                        <AddFieldGroup fieldGroups={this.state.fieldGroupOptions}
                                       createFvg={this.newFvg}/>}
                        {/*</Grid>*/}
                        {/*<Grid item>*/}
                        <Button onClick={() => this.savePatient()} variant="contained"
                                color="primary">{savePatientStr}</Button>
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </MainContainer>
            </Fragment>
        );
    }
}

PatientForm.propTypes = {
    patient: PropTypes.object.isRequired,
    savePatient: PropTypes.func.isRequired
};

export default withRouter(withSnackbar(PatientForm));

