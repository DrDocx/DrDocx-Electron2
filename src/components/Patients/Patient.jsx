import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch, useParams} from 'react-router-dom';
import PatientsService from '../../services/PatientsService';
import PatientsIndex from "./PatientsIndex";
import ShowPatient from "./ShowPatient";
import EditPatient from "./EditPatient";
import {withSnackbar} from "notistack";

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {patientId: this.props.match.params.patientId};
    }

    componentDidMount() {
        this.updatePatient();
    }

    updatePatient = () => {
        PatientsService.getPatient(this.state.patientId).then(patientResponse => {
           this.setState({patient: patientResponse});
        });
    };

    updatePatientOnSave = () => {
        PatientsService.getPatient(this.state.patientId).then(patientResponse => {
            this.setState({patient: patientResponse}, () => {
                this.props.history.push(`/patients/${patientResponse.id}`)
                this.props.enqueueSnackbar("Patient successfully updated!", {variant: "success"})
            });
        });
    }

    render() {
        const matchPath = this.props.match.path;
        return (
            <Fragment>
                {this.state.patient &&
                <Switch>
                    <Route exact path={matchPath}>
                        <ShowPatient patient={this.state.patient}/>
                    </Route>
                    <Route path={`${matchPath}/edit`}>
                        <EditPatient patient={this.state.patient} updatePatient={this.updatePatientOnSave}/>
                    </Route>
                </Switch>
                }
            </Fragment>
        );
    }
}

Patient.propTypes = {
    match: PropTypes.object.isRequired
};

export default withSnackbar(Patient);
