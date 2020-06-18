import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {tableIcons} from "../common/TableHelpers";
import ReportsService from "../../services/ReportsService";
const {shell} = window.require('electron');

class TemplatesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {reportTemplates: []};
    }


    componentDidMount() {
        this.updateReportTemplates()
    };


    updateReportTemplates = () => {
        ReportsService.getReports().then(reportsResponse => {
            this.setState({reportTemplates: reportsResponse});
        });
    };

    render() {
        return (
            <Fragment>
                <MaterialTable
                    style={{minWidth: "600px", width: "auto"}}
                    icons={tableIcons}
                    title=""
                    columns={[
                        {title: 'Name', field: 'name'},
                        {title: 'Last Modified', field: 'dateModified', type: 'date'},
                    ]}
                    data={this.state.reportTemplates}
                    onRowClick={(event, rowData) => shell.openItem(rowData.filePath)}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    resolve();
                                }, 250);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    resolve();
                                }, 250);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    resolve();
                                }, 250);
                            })
                    }}
                    actions={[
                        {
                            icon: tableIcons.Folder,
                            tooltip: 'Show in Folder',
                            onClick: (event, rowData) => shell.showItemInFolder(rowData.filePath)
                        }
                    ]}
                />
            </Fragment>
        );
    }
}

TemplatesTable.propTypes = {};

export default TemplatesTable;
