import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import {DatePicker} from "@material-ui/pickers";
import {Grid, withStyles} from "@material-ui/core";
import update from 'immutability-helper';
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {patientFormStyles} from "./PatientFormStyles";
import Tooltip from "@material-ui/core/Tooltip";

class FieldValueForm extends Component {

    fieldTextValue() {
        return this.props.fieldValue.fieldTextValue;
    }

    fieldName() {
        return this.props.fieldValue.field.name;
    }

    fieldMatchText() {
        return this.props.fieldValue.field.matchText;
    }

    updateFieldTextValue = (event) => {
        let value = '';
        if (this.props.fieldValue.field.type === 'Date') {
            value = event.toJSON();
        } else {
            value = event.target.value;
        }
        const newFvState = update(this.props.fieldValue, {
            fieldTextValue: {$set: value}
        });
        this.props.setFieldValue(newFvState);
    }

    renderText() {
        return (
            <Grid item xs={12} sm={6}>
                {/*<br/>*/}
                <Tooltip title={`Match Text: {{${this.fieldMatchText()}}}`}>
                    <TextField onChange={event => this.updateFieldTextValue(event)}
                               value={this.fieldTextValue()}
                               label={this.fieldName()}/>
                </Tooltip>
            </Grid>
        );
    }

    renderParagraph() {
        return (
            <Grid item xs={12}>
            {/*<br/>*/}
                <Tooltip title={`Match Text: {{${this.fieldMatchText()}}}`}>
                    <TextField
                        id="outlined-multiline-static"
                        label={this.fieldName()}
                        className={this.props.classes.paragraphFieldValue}
                        multiline
                        rows={4}
                        value={this.fieldTextValue()}
                        onChange={event => this.updateFieldTextValue(event)}
                        variant="outlined"
                    />
                </Tooltip>
            </Grid>
        );
    }

    renderDate() {
        let date = new Date(this.fieldTextValue());
        if (isNaN(date)) {
            date = new Date();
        }
        return (
            <Grid item xs={12} sm={6}>
                {/*<br/>*/}
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Tooltip title={`Match Text: {{${this.fieldMatchText()}}}`}>
                    <DatePicker
                        label={this.fieldName()}
                        value={date}
                        onChange={event => this.updateFieldTextValue(event)}
                        openTo="year"
                        format="MM/DD/yyyy"/>
                </Tooltip>
            </MuiPickersUtilsProvider>
            </Grid>
        )
    }

    render() {
        let fieldType = this.props.fieldValue.field.type;
        if (fieldType === 'Paragraph') {
            return this.renderParagraph();
        } else if (fieldType === 'Date') {
            return this.renderDate();
        }
        // 'Text' or unrecognized type renders as a basic input field
        return this.renderText();
    }
}

FieldValueForm.propTypes = {
    setFieldValue: PropTypes.func.isRequired,
    fieldValue: PropTypes.object.isRequired
};

export default withStyles(patientFormStyles)(FieldValueForm);
