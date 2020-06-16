import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

class FieldDefaultValueEdit extends Component {
    render() {
        if (this.props.editType === 'Paragraph') {
            return (
                <TextField
                    id="outlined-multiline-static"
                    style={{width: "300px"}} // This is kind of hacky but I can't figure out auto-resizing of the field.
                    multiline
                    rows={3}
                    value={this.props.target.value}
                    onChange={e => this.props.target.onChange(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        style: {
                            fontSize: 14
                        }
                    }}
                />
            );
        }
        else if (this.props.editType === 'Date') {
            return (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        format='MM/DD/yyyy'
                        value={this.props.target.value || null}
                        placeholder={this.props.target.columnDef.title}
                        onChange={this.props.target.onChange}
                        clearable
                        InputProps={{
                            style: {
                                fontSize: 14
                            }
                        }}
                    />
                </MuiPickersUtilsProvider>
            );
        }
        return (
            <Fragment>
                <TextField
                    value={this.props.target.value}
                    onChange={e => this.props.target.onChange(e.target.value)}
                    placeholder={this.props.target.columnDef.title}
                    InputProps={{
                        style: {
                            fontSize: 14
                        }
                    }}
                />
            </Fragment>
        );
    }
}

FieldDefaultValueEdit.propTypes = {
    target: PropTypes.object.isRequired,
    editType: PropTypes.string.isRequired
};

export default FieldDefaultValueEdit;
