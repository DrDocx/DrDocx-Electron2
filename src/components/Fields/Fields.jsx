import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import FieldsIndex from "./FieldsIndex";

class Fields extends Component {
    render() {
        return (
            <Fragment>
                <FieldsIndex/>
            </Fragment>
        );
    }
}

Fields.propTypes = {};

export default Fields;
