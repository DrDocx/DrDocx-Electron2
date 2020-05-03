import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch, useParams} from 'react-router-dom';
import PatientsService from '../../services/PatientsService/PatientsService';
import PatientsIndex from "./PatientsIndex";
import ShowPatient from "./ShowPatient";

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
                <Route path={`${matchPath}/:patientId`}>
                </Route>
            </Switch>
        );
    }
}

Patient.propTypes = {
    match: PropTypes.object.isRequired
};

export default Patient;
