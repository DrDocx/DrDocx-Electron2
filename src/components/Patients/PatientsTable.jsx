import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

class PatientsTable extends Component {
    render() {
        return (
            <Fragment>
                <TableContainer component={Paper}>
                    <Table aria-label="patients table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.patients.map((patient) => (
                                <TableRow key={patient.id}>
                                    <TableCell component="th" scope="row">
                                        {patient.name}
                                    </TableCell>
                                    <TableCell align="right">{patient.name}</TableCell>
                                    <TableCell align="right">{patient.name}</TableCell>
                                    <TableCell align="right">{patient.name}</TableCell>
                                    <TableCell align="right">{patient.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        );
    }
}

PatientsTable.propTypes = {
    patients: PropTypes.array
};

export default PatientsTable;
