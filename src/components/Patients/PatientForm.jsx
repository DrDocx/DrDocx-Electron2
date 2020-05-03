import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class PatientForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.patient != null) {
            this.state = {patientId: this.props.patient.id, patient: this.props.patient}
        }
    }

    upsertPatient = () => {
        if (this.state.patientId != null) {

        }
    };

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

PatientForm.propTypes = {
    patient: PropTypes.object
};

export default PatientForm;
