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

class StaticFieldValueForm extends Component {

    fieldTextValue() {
        return this.props.fieldValue.fieldTextValue;
    }

    fieldName() {
        return this.props.fieldValue.field.name;
    }

    fieldMatchText() {
        return this.props.fieldValue.field.matchText;
    }

    renderText() {
        return (
            <Grid item xs={6}>
                {/*<br/>*/}
                <Tooltip title={`Match Text: {{${this.fieldMatchText()}}}`}>
                    <TextField value={this.fieldTextValue()}
                               label={this.fieldName()}
							   disabled/>
                </Tooltip>
            </Grid>
        );
    }

    renderParagraph() {
        return (
            <Grid item xs={12}>
                <Tooltip title={`Match Text: {{${this.fieldMatchText()}}}`}>
                    <TextField
                        id="outlined-multiline-static"
                        label={this.fieldName()}
                        className={this.props.classes.paragraphFieldValue}
                        multiline
                        rows={4}
                        value={this.fieldTextValue()}
						variant="outlined"
						disabled
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
            <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Tooltip title={`Match Text: {{${this.fieldMatchText()}}}`}>
                        <DatePicker
                            label={this.fieldName()}
                            value={date}
                            onChange={event => this.updateFieldTextValue(event)}
                            openTo="year"
                            format="MM/DD/yyyy"
							disabled/>
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

export default withStyles(patientFormStyles)(StaticFieldValueForm);