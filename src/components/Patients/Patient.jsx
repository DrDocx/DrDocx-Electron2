import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch, useParams} from 'react-router-dom';
import PatientsService from '../../services/PatientsService/PatientsService';
import PatientsIndex from "./PatientsIndex";
import ShowPatient from "./ShowPatient";

class Patient extends Component {
    constructor(props) {
        super(props);
        let { patientId } = useParams();
        this.state = { patientId: patientId };
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
        let match = useRouteMatch();
        return (
            <Switch>
                <Route exact path={match.path}>
                    <ShowPatient patient={this.state.patient}/>
                </Route>
                <Route path={`${match.path}/:patientId`}>
                </Route>
            </Switch>
        );
    }
}

Patient.propTypes = {};

export default Patient;
