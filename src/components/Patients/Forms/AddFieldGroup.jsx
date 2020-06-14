import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {FormControl, Grid, InputLabel, MenuItem, Select, withStyles} from "@material-ui/core";
import {patientFormStyles} from "./PatientFormStyles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Slider from "@material-ui/core/Slider";
import Paper from "@material-ui/core/Paper";

class AddFieldGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedFieldGroupId: 0}
    }

    selectedFieldGroupChanged = (event) => {
        this.setState({selectedFieldGroupId: event.target.value});
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div style={{verticalAlign: 'bottom'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Field Group</InputLabel>
                        <Select value={this.state.selectedFieldGroupId}
                                onChange={event => this.selectedFieldGroupChanged(event)}>
                            {this.props.fieldGroups.map(group =>
                                <MenuItem value={group.id}>{group.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button style={{verticalAlign: 'bottom'}}
                            variant="contained"
                            className={classes.fieldGroupButton}
                            onClick={() => this.props.createFvg(this.state.selectedFieldGroupId)}
                    >
                        Add Field Group
                    </Button>
                </div>
            </Fragment>
        );
    }
}

AddFieldGroup.propTypes = {
    createFvg: PropTypes.func.isRequired,
    fieldGroups: PropTypes.array.isRequired
};

export default withStyles(patientFormStyles)(AddFieldGroup);
