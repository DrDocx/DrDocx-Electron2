import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import PatientsTable from "./PatientsTable";
import PatientsService from "../../services/PatientsService/PatientsService";
import {Link} from 'react-router-dom';
import {Container, Grid, TextField, Typography} from "@material-ui/core";
import FieldValueGroupSection from "./Forms/FieldValueGroupForm";
import AddFieldGroup from "./Forms/AddFieldGroup";
import Button from "@material-ui/core/Button";
import MainContainer from "../Main/MainContainer";

class PatientsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {patients: []};
    }

    componentDidMount() {
        this.updatePatients();
    }

    updatePatients = () => {
        PatientsService.getPatients().then(patientsResponse => {
            this.setState({patients: patientsResponse});
        });
    };

    render() {
        return (
            <Fragment>
                <MainContainer title={"Patients"}>
                    <PatientsTable patients={this.state.patients}/>
                </MainContainer>
            </Fragment>
        );
    }
}

PatientsIndex.propTypes = {};

export default PatientsIndex;
