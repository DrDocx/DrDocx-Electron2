import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import FieldGroupsService from "../../services/FieldsService/FieldGroupsService";
import MaterialTable from "material-table";
import {tableIcons, tableStyles} from "../common/TableHelpers";
import FieldsTable from "./FieldsTable";
import withStyles from "@material-ui/core/styles/withStyles";
import ConfirmationDialog from "../common/ConfirmationDialog";
import PatientsService from "../../services/PatientsService/PatientsService";
import FieldGroupForm from "./Forms/FieldGroupForm";
import update from 'immutability-helper';

class FieldGroupsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldGroups: [],
            fieldGroupPendingDelete: 0,
            deleteGroupConfirmOpen: false,
            editGroupFormOpen: false
        };
    }


    componentDidMount() {
        this.updateFieldGroups();
    }

    updateFieldGroups = () => {
        FieldGroupsService.getFieldGroups().then(fieldGroupResponse => {
            this.setState({fieldGroups: fieldGroupResponse});
        });
    }

    onDeleteGroupClicked = (fieldGroupId) => {
        this.setState({fieldGroupPendingDelete: fieldGroupId, deleteGroupConfirmOpen: true});
    }

    onDeleteGroupConfirmed = (confirmed) => {
        const fieldGroupId = this.state.fieldGroupPendingDelete;
        this.setState({deleteGroupConfirmOpen: false, fieldGroupPendingDelete: 0});
        if (!confirmed || fieldGroupId === 0) {
            return;
        }
        FieldGroupsService.deleteFieldGroup(fieldGroupId).then(() => {
            const newFieldGroupsArr = this.state.fieldGroups.filter(fg => fg.id !== fieldGroupId);
            this.setState({fieldGroups: newFieldGroupsArr});
            this.props.enqueueSnackbar("Field group successfully deleted.", {variant: "success"})
        });
    }

    onFormDone = (groupWasSaved, fieldGroup) => {
        this.setState({editGroupFormOpen: false});
        if (groupWasSaved) {
            const groupToUpdateIndex = this.state.fieldGroups.findIndex(fg => fg.id === fieldGroup.id);
            if (groupToUpdateIndex < 0) {
                const newFieldGroupsState = update(this.state.fieldGroups, {
                    $push: [fieldGroup]
                });
                this.setState({fieldGroups: newFieldGroupsState});
            }
            else {
                const newFieldGroupsState = update(this.state.fieldGroups, {
                    $splice: [[groupToUpdateIndex, 1, fieldGroup]]
                });
                this.setState({fieldGroups: newFieldGroupsState});
            }
        }
    }

    render() {
        return (
            <Fragment>
                <ConfirmationDialog open={this.state.deleteGroupConfirmOpen}
                                    confirmDelete={this.onDeleteGroupConfirmed}/>
                <FieldGroupForm open={this.state.editGroupFormOpen} onFormDone={this.onFormDone}/>
                <MaterialTable
                    style={{minWidth: "600px"}}
                    icons={tableIcons}
                    columns={[
                        {title: 'Name', field: 'name'},
                        {title: 'Description', field: 'description'}
                    ]}
                    data={this.state.fieldGroups}
                    title=""
                    detailPanel={rowData => <FieldsTable fields={rowData.fields}/>}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    actions={[
                        {
                            icon: tableIcons.Edit,
                            tooltip: 'Edit Patient',
                            onClick: (event, rowData) => {
                            }
                        },
                        {
                            icon: tableIcons.Delete,
                            tooltip: 'Delete Field Group',
                            onClick: (event, rowData) => this.onDeleteGroupClicked(rowData.id)
                        },
                        {
                            icon: tableIcons.Add,
                            tooltip: 'Add Field Group',
                            isFreeAction: true,
                            onClick: () => this.onRowAction('add', 0)
                        }
                    ]}
                />
            </Fragment>
        );
    }
}

FieldGroupsTable.propTypes = {};

export default withStyles(tableStyles)(FieldGroupsTable);
