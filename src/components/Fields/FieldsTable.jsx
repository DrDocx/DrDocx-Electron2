import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {tableIcons} from "../common/TableHelpers";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

class FieldsTable extends Component {
    renderFieldTypeEdit(t) {
        return (
            <Fragment>
                <Select
                    value={t.value}
                    onChange={e => {
                        t.onChange(e.target.value);
                        console.group(e.target.value);
                        this.currentValueType = e.target.value;
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
        const editType = t.rowData.type ?? this.currentValueType;
        return (
            <Fragment>
                <TextField
                    value={t.value}
                    onChange={e => t.onChange(e.target.value)}
                    placeholder={t.columnDef.title}
                    InputProps={{
                        style: {
                            fontSize: 13,
                        }
                    }}
                />
            </Fragment>
        );
    }

    renderTextEdit(t) {

    }

    renderParagraphEdit(t) {

    }

    renderDateEdit(t) {

    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    style={{minWidth: "600px"}}
                    icons={tableIcons}
                    columns={[
                        {title: 'Name', field: 'name'},
                        {title: 'Type', field: 'type', width: '5px', editable: 'onAdd', editComponent: t => this.renderFieldTypeEdit(t)},
                        {title: 'Match Text', field: 'matchText'},
                        {title: 'Default Value', field: 'defaultValue', editComponent: t => this.renderDefaultValueEdit(t)}
                    ]}
                    data={this.props.fields}
                    title="Fields"
                    options={{
                        actionsColumnIndex: -1,
                        // search: false
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
                />
            </Fragment>
        );
    }
}

FieldsTable.propTypes = {
    fields: PropTypes.array.isRequired
};

export default FieldsTable;
