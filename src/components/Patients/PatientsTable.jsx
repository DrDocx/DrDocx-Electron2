import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import MaterialTable from "material-table";
import ConfirmationDialog from "../common/ConfirmationDialog";
import PatientsService from "../../services/PatientsService/PatientsService";
import {withSnackbar} from "notistack";
import {tableIcons} from "../common/TableHelpers";

class PatientsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {patients: [], patientPendingDelete: 0, deleteConfirmOpen: false}
    }

    componentDidMount() {
        this.updatePatients();
    }

    updatePatients = () => {
        PatientsService.getPatients().then(patientsResponse => {
            this.setState({patients: patientsResponse});
        });
    };

    onRowAction = (actionType, patientId) => {
        if (actionType === 'show') {
            this.props.history.push(`/patients/${patientId}`)
        }
        else if (actionType === 'edit') {
            this.props.history.push(`/patients/${patientId}/edit`)
        }
        else if (actionType === 'add') {
            this.props.history.push('/patients/new');
        }
    };

    onRowDeleteClicked = (patientId) => {
        this.setState({patientPendingDelete: patientId, deleteConfirmOpen: true});
    }

    onRowDeleteConfirmed = (confirmed) => {
        const patientId = this.state.patientPendingDelete;
        this.setState({deleteConfirmOpen: false, patientPendingDelete: 0});
        if (!confirmed || patientId === 0) {
            return;
        }
        PatientsService.deletePatient(patientId).then(() => {
            const newPatientsArr = this.state.patients.filter(p => p.id !== patientId);
            this.setState({patients: newPatientsArr});
            this.props.enqueueSnackbar("Patient successfully deleted.", {variant: "success"})
        });
    }

    render() {
        return (
            <Fragment>
                <ConfirmationDialog open={this.state.deleteConfirmOpen} confirmDelete={this.onRowDeleteConfirmed} />
                <MaterialTable
                    style={{minWidth: "600px", width: "auto" }}
                    icons={tableIcons}
                    title=""
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Last Modified', field: 'dateModified', type: 'date' },
                    ]}
                    data={this.state.patients}
                    onRowClick={(event, rowData) => this.onRowAction('show', rowData.id)}
                    actions={[
                        // {
                        //     icon: tableIcons.PageviewIcon,
                        //     tooltip: 'Show Patient',
                        //     onClick: (event, rowData) => this.onRowAction('show', rowData.id)
                        // },
                        {
                            icon: tableIcons.Edit,
                            tooltip: 'Edit Patient',
                            onClick: (event, rowData) => this.onRowAction('edit', rowData.id)
                        },
                        {
                            icon: tableIcons.Delete,
                            tooltip: 'Delete Patient',
                            onClick: (event, rowData) => this.onRowDeleteClicked(rowData.id)
                        },
                        {
                            icon: tableIcons.Add,
                            tooltip: 'Add Patient',
                            isFreeAction: true,
                            onClick: () => this.onRowAction('add', 0)
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </Fragment>
        );
    }
}

PatientsTable.propTypes = {};

export default withSnackbar(withRouter(PatientsTable));
