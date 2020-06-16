import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import FieldGroupsService from "../../services/FieldsService/FieldGroupsService";
import MaterialTable from "material-table";
import {tableIcons, tableStyles} from "../common/TableHelpers";
import FieldsTable from "./FieldsTable";
import withStyles from "@material-ui/core/styles/withStyles";
import update from 'immutability-helper';

class FieldGroupsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {fieldGroups: []};
    }


    componentDidMount() {
        this.updateFieldGroups();
    }

    updateFieldGroups = () => {
        FieldGroupsService.getFullFieldGroups().then(fieldGroupResponse => {
            this.setState({fieldGroups: fieldGroupResponse});
        });
    }

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
                <MaterialTable
                    style={{minWidth: "700px"}}
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
                                }, 250);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldGroupUpdated(oldData, newData);
                                    resolve();
                                }, 250);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldGroupDeleted(oldData);
                                    resolve();
                                }, 250);
                            })
                    }}
                />
            </Fragment>
        );
    }
}

FieldGroupsTable.propTypes = {};

export default withStyles(tableStyles)(FieldGroupsTable);
