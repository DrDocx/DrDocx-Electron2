import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import FieldsIndex from "./FieldsIndex";

class Fields extends Component {
    render() {
        const matchPath = this.props.match.path;
        return (
            <FieldsIndex/>
        );
    }
}

Fields.propTypes = {};

export default Fields;
