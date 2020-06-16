import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class ConfirmationDialog extends Component {
    render() {
        return (
            <Fragment>


            </Fragment>
        );
    }
}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    confirmTitle: PropTypes.string,
    confirmBodyText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string
};

export default ConfirmationDialog;
