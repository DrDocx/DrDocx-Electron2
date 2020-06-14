import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import PageviewIcon from '@material-ui/icons/Pageview';
import ConfirmationDialog from "../Main/ConfirmationDialog";
import PatientsService from "../../services/PatientsService/PatientsService";

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
        PatientsService.deletePatient(this.state.patientPendingDelete).then(() => {
            const newPatientsArr = this.state.patients.filter(p => p.id !== patientId);
            this.setState({patients: newPatientsArr});
        });
    }

    render() {
        return (
            <Fragment>
                <ConfirmationDialog open={this.state.deleteConfirmOpen} confirmDelete={this.onRowDeleteConfirmed} />
                <MaterialTable
                    style={{minWidth: "600px", width: "auto", maxWidth: "1000px"}}
                    icons={tableIcons}
                    title=""
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Last Modified', field: 'dateModified', type: 'date' },
                    ]}
                    data={this.state.patients}
                    actions={[
                        {
                            icon: tableIcons.PageviewIcon,
                            tooltip: 'Show User',
                            onClick: (event, rowData) => this.onRowAction('show', rowData.id)
                        },
                        {
                            icon: tableIcons.Edit,
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => this.onRowAction('edit', rowData.id)
                        },
                        {
                            icon: tableIcons.Delete,
                            tooltip: 'Delete Patient',
                            onClick: (event, rowData) => this.onRowDeleteClicked(rowData.id)
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

PatientsTable.propTypes = {
    patients: PropTypes.array
};

export default withRouter(PatientsTable);

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
    PageviewIcon: forwardRef((props, ref) => <PageviewIcon {...props} ref={ref} />),
};
