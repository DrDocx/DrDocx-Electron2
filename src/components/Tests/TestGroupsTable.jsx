import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import TestGroupsService from "../../services/TestGroupsService";
import update from "immutability-helper";
import MaterialTable from "material-table";
import {tableIcons} from "../common/TableHelpers";
import testsTable from "../tests/testsTable";

class TestGroupsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {testGroups: []};
    }


    componentDidMount() {
        this.updateTestGroups();
    }

    updateTestGroups = () => {
        TestGroupsService.getFullTestGroups().then(testGroupResponse => {
            this.setState({testGroups: testGroupResponse});
        });
    }

    onTestGroupUpdated = (oldGroup, newGroup) => {
        TestGroupsService.updateTestGroup(newGroup).then(testGroupResponse => {
            const groupToUpdateIndex = this.state.testGroups.findIndex(fg => fg.id === oldGroup.id);
            if (groupToUpdateIndex >= 0) {
                const newTestGroupsState = update(this.state.testGroups, {
                    $splice: [[groupToUpdateIndex, 1, newGroup]]
                });
                this.setState({testGroups: newTestGroupsState});
            }
        });
    }

    onTestGroupCreated = (newGroup) => {
        TestGroupsService.createTestGroup(newGroup).then(testGroupResponse => {
            const newTestGroupsState = update(this.state.testGroups, {
                $push: [testGroupResponse]
            });
            this.setState({testGroups: newTestGroupsState});
        });
    }

    onTestGroupDeleted = (groupToDelete) => {
        TestGroupsService.deleteTestGroup(groupToDelete.id).then(testGroupResponse => {
            const groupToDeleteIndex = this.state.testGroups.findIndex(fg => fg.id === groupToDelete.id);
            const newTestGroupsState = update(this.state.testGroups, {
                $splice: [[groupToDeleteIndex, 1]]
            });
            this.setState({testGroups: newTestGroupsState});
        });
    }

    onGroupTestsUpdated = (testGroupId, newTests) => {
        const groupToUpdateIndex = this.state.testGroups.findIndex(fg => fg.id === testGroupId);
        if (groupToUpdateIndex < 0) {
            return;
        }
        const newtestGroupsState = update(this.state.testGroups, {
            [groupToUpdateIndex]: {
                tests: {$set: newTests}
            }
        });
        this.setState({testGroups: newtestGroupsState});
    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    style={{minWidth: "700px"}}
                    icons={tableIcons}
                    columns={[
                        {title: 'Name', test: 'name'},
                        {title: 'Description', test: 'description'},
                        {title: 'Is Default', test: 'isDefaultGroup', type: 'boolean'}
                    ]}
                    data={this.state.testGroups}
                    title=""
                    detailPanel={rowData => <testsTable tests={rowData.tests} testGroupId={rowData.id}
                                                         onGroupTestsUpdated={this.onGroupTestsUpdated}/>}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    options={{
                        actionsColumnIndex: -1
                    }}
                    localization={{body: {editRow: {deleteText: 'Are you sure you want to delete this test group?'}}}}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onTestGroupCreated(newData);
                                    resolve();
                                }, 250);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onTestGroupUpdated(oldData, newData);
                                    resolve();
                                }, 250);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onTestGroupDeleted(oldData);
                                    resolve();
                                }, 250);
                            })
                    }}
                />
            </Fragment>
        );
    }
}

TestGroupsTable.propTypes = {};

export default TestGroupsTable;
