import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Card, CardContent, CardActions, Button, Typography} from "@material-ui/core";
import {patientFormStyles} from "./PatientFormStyles";

class FieldValueGroupSection extends Component {
    constructor(props) {
        super(props);
        this.state = {fieldValueGroup: this.props.fieldValueGroup};
    }


    renderFieldValue(fieldValue) {
        switch (fieldValue.field.type) {

        }

        return (
            <Fragment>

            </Fragment>
        );
    }

    render() {
        const {classes} = this.props;
        return (
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
                    <Button size="small" color="secondary">Delete</Button>
                </CardActions>
            </Card>
        );
    }
}

FieldValueGroupSection.propTypes = {
    fieldValueGroup: PropTypes.object.isRequired,
    setFvgState: PropTypes.func.isRequired
};

export default withStyles(patientFormStyles)(FieldValueGroupSection);
