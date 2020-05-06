import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

class RemoveFvgDialog extends Component {
    render() {
        return (
            <Fragment>
                <Dialog
                    open={this.props.open}
                    onClose={() => this.props.confirmDelete(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete group "${this.props.groupName}"?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action cannot be undone once the patient is saved.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.confirmDelete(false)} color="default">
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.confirmDelete(true)} color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
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
