import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FieldGroup from "../../../models/FieldGroup";
import FieldGroupsService from "../../../services/FieldsService/FieldGroupsService";

class FieldGroupForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.fieldGroup == null) {
            this.state = {fieldGroup: new FieldGroup()}; // TODO: Add field group constructor
        } else {
            this.state = {fieldGroup: this.props.fieldGroup};
        }
    }

    saveFieldGroup = () => {
        if (this.props.fieldGroup == null) {
            FieldGroupsService.createFieldGroup(this.state.fieldGroup).then(() => {
                this.props.onFormDone(true);
            });
        } else {
            FieldGroupsService.updateFieldGroup(this.state.fieldGroup.id, this.state.fieldGroup).then(() => {
                this.props.onFormDone(true);
            });
        }
    }

    render() {
        const titleStr = this.props.newFieldGroup ? "New Field Group" : "Update Field Group";
        const saveStr = this.props.newFieldGroup ? "Create Field Group" : "Save Field Group";
        return (
            <Fragment>
                <Dialog
                    open={this.props.open}
                    onClose={() => this.props.onFormDone(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{titleStr}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.onFormDone(false, null)} color="default">
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.confirmDelete(true, this.state.fieldGroup)} color="primary" autoFocus>
                            {saveStr}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

FieldGroupForm.propTypes = {
    open: PropTypes.bool.isRequired,
    fieldGroup: PropTypes.object,
    onFormDone: PropTypes.func.isRequired
};

export default FieldGroupForm;
