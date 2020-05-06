import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";

class ShowPatient extends Component {
    render() {
        return (
            <Fragment>
                <Link to={`${this.props.match.url}/edit`}>Edit</Link>
            </Fragment>
        );
    }
}

ShowPatient.propTypes = {
    patient: PropTypes.object.isRequired
};

export default withRouter(ShowPatient);
