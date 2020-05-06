import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Card, CardContent, CardActions, Button, Typography} from "@material-ui/core";
import {patientFormStyles} from "./PatientFormStyles";
import RemoveFvgDialog from "./RemoveFvgDialog";

class FieldValueGroupSection extends Component {
    constructor(props) {
        super(props);
        this.state = {fieldValueGroup: this.props.fieldValueGroup, removeDialog: false};
    }

    confirmDelete = (confirmed) => {
        this.setState({removeDialog: false});
        if (!confirmed) {
            return;
        }
        this.props.removeFvg(this.state.fieldValueGroup.fieldGroupId);
    };

    renderFieldValue(fieldValue) {
        switch (fieldValue.field.type) {

        }

        return (
            <Fragment>

            </Fragment>
        );
    }

    removeFvg

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <RemoveFvgDialog open={this.state.removeDialog} confirmDelete={this.confirmDelete} groupName={this.state.fieldValueGroup.fieldGroup.name} />
                <Card className={classes.fieldGroupCard}>
                    <CardContent>
                        <Typography className={classes.fieldGroupName} variant="h6">
                            {this.state.fieldValueGroup.fieldGroup.name}
                        </Typography>
                        <Typography className={classes.fieldGroupDescription} color="textSecondary">
                            {this.state.fieldValueGroup.fieldGroup.description}
                        </Typography>
                        {this.state.fieldValueGroup.fieldValues.map(fv => this.renderFieldValue(fv))}
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="secondary" onClick={() => this.setState({removeDialog: true})}>Delete</Button>
                    </CardActions>
                </Card>
            </Fragment>
        );
    }
}

FieldValueGroupSection.propTypes = {
    fieldValueGroup: PropTypes.object.isRequired,
    setFvgState: PropTypes.func.isRequired,
    removeFvg: PropTypes.func.isRequired
};

export default withStyles(patientFormStyles)(FieldValueGroupSection);
