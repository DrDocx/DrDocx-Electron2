import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import PatientForm from "./PatientForm";

class EditPatient extends Component {

    render() {
        return (
            <Fragment>
                <PatientForm patient={this.props.patient} />
            </Fragment>
        );
    }
}

EditPatient.propTypes = {
    patient: PropTypes.object.isRequired
};

export default EditPatient;
