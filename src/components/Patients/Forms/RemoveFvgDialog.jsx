import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import ConfirmationDialog from "../../common/ConfirmationDialog";

class RemoveFvgDialog extends Component {
    render() {
        return (
            <Fragment>
                <ConfirmationDialog open={this.props.open} confirmDelete={this.props.confirmDelete}
                                    confirmTitle={`Are you sure you want to delete group "${this.props.groupName}"?`}/>
            </Fragment>
        );
    }
}

RemoveFvgDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired
};

export default RemoveFvgDialog;
