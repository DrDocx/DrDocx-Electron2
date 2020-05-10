import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import {DatePicker} from "@material-ui/pickers";
import {Grid, withStyles} from "@material-ui/core";
import update from 'immutability-helper';
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {patientFormStyles} from "./PatientFormStyles";

class FieldValueForm extends Component {

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
            <Fragment>
                <TextField onChange={event => this.updateFieldTextValue(event)}
                           value={this.props.fieldValue.fieldTextValue}
                           label={this.props.fieldValue.field.name}/>
            </Fragment>
        );
    }

    renderParagraph() {
        return (
            <Fragment>
                <TextField
                    id="outlined-multiline-static"
                    label={this.props.fieldValue.field.name}
                    className={this.props.classes.paragraphFieldValue}
                    multiline
                    rows={4}
                    value={this.props.fieldValue.fieldTextValue}
                    onChange={event => this.updateFieldTextValue(event)}
                    variant="outlined"
                />
            </Fragment>
        );
    }

    renderDate() {
        let date = new Date(this.props.fieldValue.fieldTextValue);
        if (isNaN(date)) {
            date = new Date();
        }
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    label={this.props.fieldValue.field.name}
                    value={date}
                    onChange={event => this.updateFieldTextValue(event)}
                    openTo="year"
                    format="MM/DD/yyyy"/>
            </MuiPickersUtilsProvider>
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
