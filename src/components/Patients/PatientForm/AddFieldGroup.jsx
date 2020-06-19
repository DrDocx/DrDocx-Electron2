import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {FormControl, Grid, InputLabel, MenuItem, Select, withStyles} from "@material-ui/core";
import {patientFormStyles} from "./PatientFormStyles";
import SelectAndAct from "../../common/SelectAndAct";

class AddFieldGroup extends Component {
    render() {
        return (
            <Fragment>
                <SelectAndAct inputLabelText={"Field Group"} inputOptions={this.props.fieldGroups}
                              actionButtonText={"Add Field Group"} onActionTaken={this.props.createFvg}/>
            </Fragment>
        );
    }
}

AddFieldGroup.propTypes = {
    createFvg: PropTypes.func.isRequired,
    fieldGroups: PropTypes.array.isRequired
};

export default withStyles(patientFormStyles)(AddFieldGroup);
