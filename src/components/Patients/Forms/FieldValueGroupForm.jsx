import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';

class FieldValueGroupForm extends Component {
    constructor(props) {
        super(props);
        var fieldValueGroup = this.props.fieldValueGroup;
        if (fieldValueGroup == null) {
            fieldValueGroup = {id: 0, fieldGroupId: this.props.fieldGroup.id, fieldValues: []};
        }
        this.state = { fieldValueGroup: fieldValueGroup };
    }



    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

FieldValueGroupForm.propTypes = {
    fieldValueGroup: PropTypes.object
};

export default FieldValueGroupForm;
