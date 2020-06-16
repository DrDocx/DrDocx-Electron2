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
import FieldDefaultValueEdit from "./DefaultValueEdit";

class FieldsTable extends Component {
    constructor(props) {
        super(props);
        this.setState({currentValueType: "Text"})
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
        return (<FieldDefaultValueEdit target={t} editType={editType} />);
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
