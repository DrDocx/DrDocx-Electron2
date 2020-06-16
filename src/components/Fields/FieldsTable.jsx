import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {tableIcons} from "../common/TableHelpers";

class FieldsTable extends Component {
    render() {
        return (
            <Fragment>
                <MaterialTable
                    style={{minWidth: "600px"}}
                    icons={tableIcons}
                    columns={[
                        {title: 'Name', field: 'name'},
                        {title: 'Type', field: 'type'},
                        {title: 'Match Text', field: 'matchText'},
                        {title: 'Default Value', field: 'defaultValue'}
                    ]}
                    data={this.props.fields}
                    title="Fields"
                    detailPanel={rowData => <FieldsTable fields={rowData.fields}/>}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
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
