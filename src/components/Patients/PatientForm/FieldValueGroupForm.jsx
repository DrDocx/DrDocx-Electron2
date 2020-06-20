import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Card, CardContent, CardActions, Button, Typography} from "@material-ui/core";
import {patientFormStyles} from "./PatientFormStyles";
import RemoveFvgDialog from "./RemoveFvgDialog";
import FieldValueForm from "./FieldValueForm";
import Grid from "@material-ui/core/Grid";

class FieldValueGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {removeDialog: false};
    }

    confirmDelete = (confirmed) => {
        this.setState({removeDialog: false});
        if (!confirmed) {
            return;
        }
        this.props.removeFvg(this.props.fieldValueGroup.fieldGroupId);
    };

    setFieldValue = (fieldValue) => {
        const fvIndex = this.props.fieldValueGroup.fieldValues.findIndex(fv => fv.fieldId === fieldValue.fieldId);
        const fvg = this.props.fieldValueGroup;
        fvg.fieldValues[fvIndex] = fieldValue;
        this.props.setFvgState(fvg);
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <RemoveFvgDialog open={this.state.removeDialog} confirmDelete={this.confirmDelete}
                                 groupName={this.props.fieldValueGroup.fieldGroup.name}/>
                <Card className={classes.fieldGroupCard}>
                    <CardContent>
                        <Typography className={classes.fieldGroupName} variant="h6">
                            {this.props.fieldValueGroup.fieldGroup.name}
                        </Typography>
                        <Typography className={classes.fieldGroupDescription} color="textSecondary">
                            {this.props.fieldValueGroup.fieldGroup.description}
                        </Typography>
                        <br />
                        <Grid container direction="column"
                              alignItems="flex-start"
                              alignContent="flex-start"
                              spacing={2}>
                            {this.props.fieldValueGroup.fieldValues.map(fv =>

                                    <FieldValueForm key={fv.fieldId} setFieldValue={this.setFieldValue} fieldValue={fv}/>

                            )}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="secondary"
                                onClick={() => this.setState({removeDialog: true})}>Delete</Button>
                    </CardActions>
                </Card>
            </Fragment>
        );
    }
}

FieldValueGroupForm.propTypes = {
    fieldValueGroup: PropTypes.object.isRequired,
    setFvgState: PropTypes.func.isRequired,
    removeFvg: PropTypes.func.isRequired
};

export default withStyles(patientFormStyles)(FieldValueGroupForm);
