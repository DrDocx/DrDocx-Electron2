import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {tableIcons} from "../common/TableHelpers";
import ReportsService from "../../services/ReportsService";
import Button from "@material-ui/core/Button";
import {withSnackbar} from "notistack";
import update from "immutability-helper";
// This is not strictly necessary for the Electron app to work, but is used so the app can still be loaded/debugged in a browser.
const electron = window.require ? window.require('electron') : null;

class TemplatesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {reportTemplates: []};
    }


    componentDidMount() {
        this.updateReportTemplates()
    };


    updateReportTemplates = () => {
        ReportsService.getReportTemplates().then(reportsResponse => {
            this.setState({reportTemplates: reportsResponse});
        });
    };

    onReportTemplateCreated = (templateToCreate) => {
        if (this.state.currentFile == null) {
            this.props.enqueueSnackbar("You must select a template file.", {variant: "error"});
            return;
        }
        ReportsService.createReportTemplate(templateToCreate, this.state.currentFile).then(templateResponse => {
            const newReportTemplates = update(this.state.reportTemplates, {
                $push: [templateResponse]
            });
            this.setState({reportTemplates: newReportTemplates, currentFile: null});
        });
    }

    onReportTemplateUpdated = (templateToUpdate) => {
        ReportsService.updateReportTemplate(templateToUpdate).then(templateResponse => {
            const templateToUpdateIndex = this.state.reportTemplates.findIndex(rt => rt.id === templateToUpdate.id);
            if (templateToUpdateIndex < 0) {
                return;
            }
            const newReportTemplates = update(this.state.reportTemplates, {
                $splice: [[templateToUpdateIndex, 1, templateToUpdate]]
            });
            this.setState({reportTemplates: newReportTemplates});
        });
    };

    onReportTemplateDeleted = (templateToDelete) => {
        ReportsService.deleteReportTemplate(templateToDelete.id).then(templateResponse => {
            const templateToDeleteIndex = this.state.reportTemplates.findIndex(rt => rt.id === templateToDelete.id);
            if (templateToDeleteIndex < 0) {
                return;
            }
            const newReportTemplates = update(this.state.reportTemplates, {
                $splice: [[templateToDeleteIndex, 1]]
            });
            this.setState({reportTemplates: newReportTemplates});
        });
    }

    renderFileEditComponent = (t) => {
        return (
            <Fragment>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        onChange={(event) => this.setState({currentFile: event.target.files[0]})}
                        type="file"
                        accept={".docx,.dotx"}
                        style={{display: "none"}}
                    />
                </Button>
                {this.state.currentFile &&
                <Fragment>
                    <br/>
                    {this.state.currentFile.name}
                </Fragment>}
            </Fragment>
        );
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
                        {
                            title: 'File',
                            field: 'fileName',
                            editable: "onAdd",
                            editComponent: t => this.renderFileEditComponent(t)
                        },
                    ]}
                    data={this.state.reportTemplates}
                    onRowClick={(event, rowData) => electron && electron.remote.shell.openItem(rowData.filePath)}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    localization={{body: {editRow: {deleteText: 'Are you sure you want to delete this report template?'}}}}
                    editable={{
                        onRowAddCancelled: rowData =>
                            this.setState({currentFile: null}),
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onReportTemplateCreated(newData);
                                    resolve();
                                }, 500);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onReportTemplateUpdated(newData);
                                    resolve();
                                }, 250);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onReportTemplateDeleted(oldData);
                                    resolve();
                                }, 250);
                            })
                    }}
                    actions={[
                        {
                            icon: tableIcons.Folder,
                            tooltip: 'Show in Folder',
                            onClick: (event, rowData) => electron && electron.remote.shell.showItemInFolder(rowData.filePath)
                        }
                    ]}
                />
            </Fragment>
        );
    }
}

TemplatesTable.propTypes = {};

export default withSnackbar(TemplatesTable);
