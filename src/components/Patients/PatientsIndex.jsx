import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsTable from "./PatientsTable";
import PatientsService from "../../services/PatientsService";
import {Link} from 'react-router-dom';
import {Container, Grid, TextField, Typography} from "@material-ui/core";
import FieldValueGroupSection from "./PatientForm/FieldValueGroupForm";
import AddFieldGroup from "./PatientForm/AddFieldGroup";
import Button from "@material-ui/core/Button";
import MainContainer from "../common/MainContainer";

class PatientsIndex extends Component {
    render() {
        return (
            <Fragment>
                <MainContainer title={"Patients"}>
                    <PatientsTable/>
                </MainContainer>
            </Fragment>
        );
    }
}

PatientsIndex.propTypes = {};

export default PatientsIndex;
