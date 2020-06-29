import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Card, CardContent, CardActions, Button, Typography} from "@material-ui/core";
import {patientFormStyles} from "./PatientFormStyles";
import RemoveFvgDialog from "./RemoveFvgDialog";
import StaticFieldValueForm from "./StaticFieldValueForm";
import Grid from "@material-ui/core/Grid";

class StaticFieldValueGroupForm extends Component {
	render(){
		const {classes} = this.props;
		return (
            <Fragment>
                <Card className={classes.fieldGroupCard}>
                    <CardContent>
                        <Typography className={classes.fieldGroupName} variant="h6">
                            {this.props.fieldValueGroup.fieldGroup.name}
                        </Typography>
                        <Typography className={classes.fieldGroupDescription} color="textSecondary">
                            {this.props.fieldValueGroup.fieldGroup.description}
                        </Typography>
                        <br/>
                        <div className={classes.fieldValueGroupContainer}>
                        <Grid container direction="column"
                              alignItems="flex-start"
                              alignContent="flex-start"
                              spacing={2}>
                            {this.props.fieldValueGroup.fieldValues.map(fv =>
                                <StaticFieldValueForm key={fv.fieldId} setFieldValue={this.setFieldValue} fieldValue={fv}/>
                            )}
                        </Grid>
                        </div>
                    </CardContent>
                </Card>
            </Fragment>
        );
	}
}

StaticFieldValueGroupForm.propTypes = {
    fieldValueGroup: PropTypes.object.isRequired
};

export default withStyles(patientFormStyles)(StaticFieldValueGroupForm);