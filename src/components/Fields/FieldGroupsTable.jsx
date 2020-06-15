import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import FieldGroupsService from "../../services/FieldsService/FieldGroupsService";

class FieldGroupsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {fieldGroups: []};
    }


    componentDidMount() {
        this.updateFieldGroups();
    }

    updateFieldGroups = () => {
        FieldGroupsService.getFieldGroups().then(fieldGroupResponse => {
            this.setState({fieldGroups: fieldGroupResponse});
        });
    }

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

FieldGroupsTable.propTypes = {};

export default FieldGroupsTable;
