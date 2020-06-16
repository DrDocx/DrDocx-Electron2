import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {tableIcons} from "../common/TableHelpers";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {DatePicker} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Tooltip from "@material-ui/core/Tooltip";

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
                    InputProps={{
                        style: {
                            fontSize: 14
                        }
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
        if (editType === 'Paragraph') {
            return (
                <TextField
                    id="outlined-multiline-static"
                    style={{width: "300px"}} // This is kind of hacky but I can't figure out auto-resizing of the field.
                    multiline
                    rows={3}
                    value={t.value}
                    onChange={e => t.onChange(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        style: {
                            fontSize: 14
                        }
                    }}
                />
            );
        }
        else if (editType === 'Date') {
            return (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        format='MM/DD/yyyy'
                        value={t.value || null}
                        placeholder={t.columnDef.title}
                        onChange={t.onChange}
                        clearable
                        InputProps={{
                            style: {
                                fontSize: 14
                            }
                        }}
                    />
                </MuiPickersUtilsProvider>
            );
        }
        return (
            <Fragment>
                <TextField
                    value={t.value}
                    onChange={e => t.onChange(e.target.value)}
                    placeholder={t.columnDef.title}
                    InputProps={{
                        style: {
                            fontSize: 14
                        }
                    }}
                />
            </Fragment>
        );
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
                />
            </Fragment>
        );
    }
}

FieldsTable.propTypes = {
    fields: PropTypes.array.isRequired
};

export default FieldsTable;
