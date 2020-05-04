import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientForm from "./PatientForm";

class NewPatient extends Component {
    render() {
        return (
            <Fragment>
                <PatientForm />
            </Fragment>
        );
    }
}

NewPatient.propTypes = {};

export default NewPatient;
