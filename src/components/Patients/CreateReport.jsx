import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import ReportsService from "../../services/ReportsService";
import Dialog from "../common/Dialog";
import SelectAndAct from "../common/SelectAndAct";
import {withSnackbar} from "notistack";

class CreateReport extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.updateTemplateOptions();
    }

    updateTemplateOptions = () => {
        ReportsService.getReportTemplates().then(templatesResponse => {
            this.setState({templateOptions: templatesResponse});
        })
    };

    generateReport = (reportTemplateId) => {
        if (reportTemplateId === '' || reportTemplateId === 0) {
            this.props.enqueueSnackbar('You must select a template from which to generate the report.',
                {variant: 'error'});
            return;
        }
        ReportsService.generateReport(reportTemplateId, this.props.patient.id).then(Dialog.downloadFile);
    }

    render() {
        return (
            <Fragment>
                {this.state.templateOptions &&
                <SelectAndAct inputLabelText={"Template"} inputOptions={this.state.templateOptions}
                              actionButtonText={"Generate Report"} onActionTaken={this.generateReport}/>}
            </Fragment>
        );
    }
}

CreateReport.propTypes = {
    patient: PropTypes.object.isRequired
};

export default withSnackbar(CreateReport);
