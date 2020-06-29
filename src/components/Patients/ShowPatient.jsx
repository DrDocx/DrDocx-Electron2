import React, { Component, Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import MainContainer from "../common/MainContainer";
import CreateReport from "./CreateReport";
import { extend } from 'immutability-helper';

import StaticFieldValueGroupSection from "./PatientForm/StaticFieldValueGroupForm";
import { TextField, Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Split from 'react-split';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';


class ShowPatient extends Component {

	constructor(props) {
		super(props);
		this.state = { patient: this.props.patient, view: "fieldValueGroups" };
	}

	changeView(newView){
		this.setState({view:newView});
	}

	render() {
		const p = this.props.patient;
		if(this.state.view === "fieldValueGroups"){
			return (
				<Fragment>
					<ToggleButtonGroup value={this.state.view} exclusive onChange={(event,newView) => this.changeView(newView)} style={{width:"max-content"}}>
						<ToggleButton value="fieldValueGroups" >
							Field Groups
						</ToggleButton>
						<ToggleButton value="testResultGroups" >
							Test Results
						</ToggleButton>
					</ToggleButtonGroup>
					<MainContainer title={p.name}>
	
						<Grid container alignItems="flex-start" alignContent={"flex-start"} style={{ width: "600px" }}>
							<TextField disabled value={this.state.patient.name}
								label="Name" />
						</Grid>
						{this.state.patient.fieldValueGroups.map(fvg =>
							<StaticFieldValueGroupSection key={fvg.fieldGroupId} fieldValueGroup={fvg} />
						)}
						<Link to={`${this.props.match.url}/edit`}>
							<Button variant="contained" color="primary">
								Edit Patient
							</Button>
						</Link>
						<CreateReport patient={p} />
					</MainContainer>
				</Fragment >
			);
		}
		if(this.state.view === "testResultGroups"){
			return (
				<Fragment>
					<ToggleButtonGroup value={this.state.view} exclusive onChange={(event,newView) => this.changeView(newView)} style={{width:"max-content"}}>
						<ToggleButton value="fieldValueGroups" >
							Field Groups
						</ToggleButton>
						<ToggleButton value="testResultGroups" >
							Test Results
						</ToggleButton>
					</ToggleButtonGroup>
					This is the view test results page.
				</Fragment>
			);
		}
	}
}

ShowPatient.propTypes = {
	patient: PropTypes.object.isRequired
};

export default withRouter(ShowPatient);
