import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import MainContainer from "../common/MainContainer";
import CreateReport from "./CreateReport";
import {extend} from 'immutability-helper';

import StaticFieldValueGroupSection from "./PatientForm/StaticFieldValueGroupForm";
import {TextField, Button} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

class ShowPatient extends Component {

    constructor(props) {
        super(props);
        this.state = {patient: this.props.patient};
    }

    render() {
        const p = this.props.patient;
        return (
            <Fragment>
                <MainContainer title={p.name}>
                    <Grid container alignItems="flex-start" alignContent={"flex-start"} style={{width: "600px"}}>
                        <Tooltip title={`Match Text: {{NAME}}, {{FIRST_NAME}}, {{LAST_NAME}}`}>
                            <TextField disabled value={this.state.patient.name}
                                       label="Name"/>
                        </Tooltip>
                    </Grid>
                    {this.state.patient.fieldValueGroups.map(fvg =>
                        <StaticFieldValueGroupSection key={fvg.fieldGroupId} fieldValueGroup={fvg}/>
                    )}
                    <CreateReport patient={p}/>
                    <Button variant="contained" color="primary"
                            onClick={() => this.props.history.push(`${this.props.match.url}/edit`)}>
                        Edit Patient
                    </Button>
                </MainContainer>
            </Fragment>
        );
    }
}

ShowPatient.propTypes = {
    patient: PropTypes.object.isRequired
};

export default withRouter(ShowPatient);
