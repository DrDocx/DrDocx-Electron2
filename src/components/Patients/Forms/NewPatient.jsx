import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientForm from "./PatientForm";
import Patient from "../../../models/Patient";
import PatientsService from "../../../services/PatientsService/PatientsService";

class NewPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {ready: false};
    }

    componentDidMount() {
        this.newPatient();
    }

    newPatient = () => {
        Patient.newPatient().then((patient) => {
            this.setState({patient: patient, ready: true});
        });
    };

    savePatient = (patient) => {
        PatientsService.createPatient(patient).then((response) => {
            this.props.history.push(`/patients/${response.id}`);
        });
    };

    render() {
        return (
            <Fragment>
                {this.state.ready && <PatientForm patient={this.state.patient} savePatient={this.savePatient}/>}
            </Fragment>
        );
    }
}

NewPatient.propTypes = {};

export default NewPatient;
