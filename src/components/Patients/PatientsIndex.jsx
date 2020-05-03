import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsTable from "./PatientsTable";

class PatientsIndex extends Component {
    render() {
        return (
            <div>
                <PatientsTable/>
            </div>
        );
    }
}

PatientsIndex.propTypes = {};

export default PatientsIndex;
