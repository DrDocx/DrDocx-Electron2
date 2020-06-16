import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import FieldGroupsService from "../../services/FieldsService/FieldGroupsService";
import MaterialTable from "material-table";
import {tableIcons, tableStyles} from "../common/TableHelpers";
import FieldsTable from "./FieldsTable";
import withStyles from "@material-ui/core/styles/withStyles";
import ConfirmationDialog from "../common/ConfirmationDialog";
import FieldGroupForm from "./Forms/FieldGroupForm";
import update from 'immutability-helper';

class FieldGroupsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldGroups: [],
            fieldGroupPending: 0,
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

    /*    onAddGroupClicked = () => {
            this.setState({editGroupFormOpen: true});
        }

        onEditGroupClicked = (fieldGroup) => {
            this.setState({fieldGroupPending: fieldGroup, editGroupFormOpen: true});
        }

        onDeleteGroupClicked = (fieldGroup) => {
            this.setState({fieldGroupPending: fieldGroup, deleteGroupConfirmOpen: true});
        }

        onDeleteGroupConfirmed = (confirmed) => {
            const fieldGroupId = this.state.fieldGroupPending.id;
            this.setState({deleteGroupConfirmOpen: false, fieldGroupPending: null});
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
            this.setState({editGroupFormOpen: false, fieldGroupPending: null});
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
        }*/

    onFieldGroupUpdated = (oldGroup, newGroup) => {
        FieldGroupsService.updateFieldGroup(newGroup).then(fieldGroupResponse => {
            const groupToUpdateIndex = this.state.fieldGroups.findIndex(fg => fg.id === oldGroup.id);
            if (groupToUpdateIndex >= 0) {
                const newFieldGroupsState = update(this.state.fieldGroups, {
                    $splice: [[groupToUpdateIndex, 1, newGroup]]
                });
                this.setState({fieldGroups: newFieldGroupsState});
            }
        });
    }

    onFieldGroupCreated = (newGroup) => {
        FieldGroupsService.createFieldGroup(newGroup).then(fieldGroupResponse => {
            const newFieldGroupsState = update(this.state.fieldGroups, {
                $push: [newGroup]
            });
            this.setState({fieldGroups: newFieldGroupsState});
        });
    }

    onFieldGroupDeleted = (groupToDelete) => {
        console.log(groupToDelete);
    }

    render() {
        return (
            <Fragment>
                {/*<ConfirmationDialog open={this.state.deleteGroupConfirmOpen}*/}
                {/*                    confirmDelete={this.onDeleteGroupConfirmed}/>*/}
                {/*<FieldGroupForm open={this.state.editGroupFormOpen} onFormDone={this.onFormDone}/>*/}
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
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldGroupCreated(newData);
                                    resolve();
                                }, 500);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldGroupUpdated(oldData, newData);
                                    resolve();
                                }, 500);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldGroupDeleted(oldData);
                                    resolve();
                                }, 500);
                            })
                    }}
                />
            </Fragment>
        );
    }
}

FieldGroupsTable.propTypes = {};

export default withStyles(tableStyles)(FieldGroupsTable);
