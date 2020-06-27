import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MainContainer from "../common/MainContainer";
import TestsIndex from "./TestsIndex";

class Tests extends Component {
    render() {
        return (
            <Fragment>
                <TestsIndex />
            </Fragment>
        );
    }
}

Tests.propTypes = {};

export default Tests;
