import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import MainContainer from "../common/MainContainer";
import CreateReport from "./CreateReport";

class ShowPatient extends Component {
    render() {
        const p = this.props.patient;
        return (
            <Fragment>
                <MainContainer title={p.name}>
                    <Link to={`${this.props.match.url}/edit`}>Edit</Link>
                    <CreateReport patient={p} />
                </MainContainer>
            </Fragment>
        );
    }
}

ShowPatient.propTypes = {
    patient: PropTypes.object.isRequired
};

export default withRouter(ShowPatient);
