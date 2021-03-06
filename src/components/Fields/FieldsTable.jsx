import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {tableIcons} from "../common/TableHelpers";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FieldDefaultValueEdit from "./FieldDefaultValueEdit";
import FieldsService from "../../services/FieldsService";
import update from 'immutability-helper';
import moment from "moment";

class FieldsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {currentValueType: "Text"};
    }

    onFieldCreated = (fieldToCreate) => {
        fieldToCreate.fieldGroupId = this.props.fieldGroupId;
        FieldsService.createField(fieldToCreate).then(fieldResponse => {
            const newFields = update(this.props.fields, {
                $push: [fieldResponse]
            });
            this.props.onGroupFieldsUpdated(this.props.fieldGroupId, newFields);
        })
    }

    onFieldUpdated = (fieldToUpdate) => {
        FieldsService.updateField(fieldToUpdate).then(fieldResponse => {
            const fieldToUpdateIndex = this.props.fields.findIndex(f => f.id === fieldToUpdate.id);
            if (fieldToUpdateIndex < 0) {
                return;
            }
            const newFields = update(this.props.fields, {
                $splice: [[fieldToUpdateIndex, 1, fieldToUpdate]]
            });
            this.props.onGroupFieldsUpdated(this.props.fieldGroupId, newFields);
        });
    }

    onFieldDeleted = (fieldToDelete) => {
        FieldsService.deleteField(fieldToDelete.id).then(fieldResponse => {
            const fieldToDeleteIndex = this.props.fields.findIndex(f => f.id === fieldToDelete.id);
            if (fieldToDeleteIndex < 0) {
                return;
            }
            const newFields = update(this.props.fields, {
                $splice: [[fieldToDeleteIndex, 1]]
            });
            this.props.onGroupFieldsUpdated(this.props.fieldGroupId, newFields);
        });
    }

    renderFieldTypeEdit(t) {
        return (
            <Fragment>
                <Select
                    style={{width: "100px", fontSize: "14px"}}
                    value={t.value}
                    onChange={e => {
                        t.onChange(e.target.value);
                        this.setState({currentValueType: e.target.value});
                    }}
                >
                    <MenuItem value={'Text'}>{'Text'}</MenuItem>
                    <MenuItem value={'Paragraph'}>{'Paragraph'}</MenuItem>
                    <MenuItem value={'Date'}>{'Date'}</MenuItem>
                </Select>
            </Fragment>
        );
    }

    renderDefaultValueEdit(t) {
        const editType = t.rowData.type ?? this.state.currentValueType;
        return <FieldDefaultValueEdit target={t} editType={editType}/>;
    }

    renderDefaultValueCell = (rowData) => {
        if (rowData.type === 'Date') {
            return (
                <Fragment>
                    {moment(rowData.defaultValue).format('MM/DD/yyyy')}
                </Fragment>
            )
        }
        return (
            <Fragment>
                {rowData.defaultValue}
            </Fragment>
        )
    }

    render() {
        return (
            <div style={{padding: "20px"}}>
                <MaterialTable
                    style={{minWidth: "600px"}}
                    icons={tableIcons}
                    columns={[
                        {
                            title: 'Name',
                            field: 'name'
                        },
                        {
                            title: 'Type',
                            field: 'type',
                            width: '5px',
                            editable: 'onAdd',
                            editComponent: t => this.renderFieldTypeEdit(t)
                        },
                        {
                            title: 'Match Text',
                            field: 'matchText'
                        },
                        {
                            title: 'Default Value',
                            field: 'defaultValue',
                            render: rowData => this.renderDefaultValueCell(rowData),
                            editComponent: t => this.renderDefaultValueEdit(t)
                        }
                    ]}
                    data={this.props.fields}
                    title="Fields"
                    options={{
                        actionsColumnIndex: -1,
                        emptyRowsWhenPaging: false,
                        pageSize: 10
                    }}
                    localization={{body: {editRow: {deleteText: 'Are you sure you want to delete this field?'}}}}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldCreated(newData);
                                    resolve();
                                }, 250);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldUpdated(newData);
                                    resolve();
                                }, 250);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.onFieldDeleted(oldData);
                                    resolve();
                                }, 250);
                            })
                    }}
                />
            </div>
        );
    }
}

FieldsTable.propTypes = {
    fields: PropTypes.array.isRequired,
    fieldGroupId: PropTypes.number.isRequired,
    onGroupFieldsUpdated: PropTypes.func.isRequired
};

export default FieldsTable;
