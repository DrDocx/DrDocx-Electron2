import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class PatientsTable extends Component {
    render() {
        return (
            <div>
                <h1>Patients table</h1>
                {this.props.patients.map((patient) => {
                    return <Link to={"/patients/" + patient.id}>{patient.name + " "}</Link>;
                })}
            </div>
        );
    }
}

PatientsTable.propTypes = {
    patients: PropTypes.array
};

export default PatientsTable;
