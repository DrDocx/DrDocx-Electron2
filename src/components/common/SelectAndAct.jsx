import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const selectAndActStyles= (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxHeight: 40,
        marginTop: 0,
        marginLeft: 0,
        paddingLeft: -2,
    },
    actionButton: {
        maxHeight: 40
    }
});

class SelectAndAct extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedOptionId: ''}
    }

    selectedOptionChanged = (event) => {
        this.setState({selectedOptionId: event.target.value});
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div style={{verticalAlign: 'bottom'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>{this.props.inputLabelText}</InputLabel>
                        <Select value={this.state.selectedOptionId}
                                onChange={event => this.selectedOptionChanged(event)}>
                            {this.props.inputOptions.map(option =>
                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button style={{verticalAlign: 'bottom'}}
                            variant="contained"
                            className={classes.actionButton}
                            onClick={() => this.props.onActionTaken(this.state.selectedOptionId)}
                    >
                        {this.props.actionButtonText}
                    </Button>
                </div>
            </Fragment>
        );
    }
}

// TODO: Add props for custom key and name field of options
SelectAndAct.propTypes = {
    inputLabelText: PropTypes.string.isRequired,
    inputOptions: PropTypes.array.isRequired,
    actionButtonText: PropTypes.string.isRequired,
    onActionTaken: PropTypes.func.isRequired
};

export default withStyles(selectAndActStyles)(SelectAndAct);
