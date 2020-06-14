import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Link} from "react-router-dom";
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

class PatientsTable extends Component {

    render() {
        return (
            <Fragment>
                <MaterialTable
                    style={{minWidth: "600px", width: "auto", maxWidth: "1000px"}}
                    icons={tableIcons}
                    title=""
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Date Modified', field: 'dateModified', type: 'date' },
                    ]}
                    data={this.props.patients}
                    actions={[
                        {
                            icon: tableIcons.Edit,
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => window.alert("You saved " + rowData.name)
                        },
                        {
                            icon: tableIcons.Delete,
                            tooltip: 'Delete Patient',
                            onClick: (event, rowData) => window.confirm("You want to delete " + rowData.name),
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

export default PatientsTable;

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
    Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />)
};
