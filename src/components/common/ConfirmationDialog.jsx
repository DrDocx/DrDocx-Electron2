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
                <Dialog
                    open={this.props.open}
                    onClose={() => this.props.confirmDelete(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.confirmTitle || "Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.confirmBodyText || "This action cannot be undone."}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.confirmDelete(false)} color="default">
                            {this.props.cancelButtonText || "Cancel"}
                        </Button>
                        <Button onClick={() => this.props.confirmDelete(true)} color="secondary" autoFocus>
                            {this.props.confirmButtonText || "Del" +
                            "ete"}
                        </Button>
                    </DialogActions>
                </Dialog>
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
