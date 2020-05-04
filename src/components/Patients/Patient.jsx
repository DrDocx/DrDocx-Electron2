import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch, useParams} from 'react-router-dom';
import PatientsService from '../../services/PatientsService/PatientsService';
import PatientsIndex from "./PatientsIndex";
import ShowPatient from "./ShowPatient";
import EditPatient from "./Forms/EditPatient";

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = { patientId: this.props.match.params.patientId };
    }

    componentDidMount() {
        this.updatePatient();
    }

    updatePatient = () => {
      PatientsService.getPatient(this.state.patientId).then(patientResponse => {
          this.setState({ patient: patientResponse });
      });
    };

    render() {
        const matchPath = this.props.match.patch;
        return (
            <Switch>
                <Route exact path={matchPath}>
                    <ShowPatient patient={this.state.patient}/>
                </Route>
                <Route path={`${matchPath}/edit`}>
                    <EditPatient patient={this.state.patient}/>
                </Route>
            </Switch>
        );
    }
}

Patient.propTypes = {
    match: PropTypes.object.isRequired
};

export default Patient;
