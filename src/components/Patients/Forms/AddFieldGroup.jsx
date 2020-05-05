import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {FormControl, Grid, InputLabel, MenuItem, Select, withStyles} from "@material-ui/core";
import {formStyles} from "../../Form/FormStyles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Slider from "@material-ui/core/Slider";
import Paper from "@material-ui/core/Paper";

class AddFieldGroup extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div style={{"vertical-align": 'bottom'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Field Group</InputLabel>
                        <Select>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button style={{"vertical-align": 'bottom'}} variant="contained" className={classes.fieldGroupButton}>Add Field Group</Button>
                </div>
            </Fragment>
        );
    }
}

AddFieldGroup.propTypes = {};

export default withStyles(formStyles)(AddFieldGroup);
