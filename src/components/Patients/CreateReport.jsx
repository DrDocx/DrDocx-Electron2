import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import ReportsService from "../../services/ReportsService";
import SelectAndAct from "../common/SelectAndAct";

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
        ReportsService.generateReport(reportTemplateId, this.props.patient.id).then(reportResponse => {
            const fileNameRegex = /filename=(.+?);/;
            const contentHeader = reportResponse.headers['content-disposition'];
            const fileName = contentHeader.match(fileNameRegex)[1];
            const downloadUrl = window.URL.createObjectURL(new Blob([reportResponse.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    render() {
        return (
            <Fragment>
                {this.state.templateOptions && <SelectAndAct inputLabelText={"Template"} inputOptions={this.state.templateOptions}
                               actionButtonText={"Generate Report"} onActionTaken={this.generateReport}/>}
            </Fragment>
        );
    }
}

CreateReport.propTypes = {
    patient: PropTypes.object.isRequired
};

export default CreateReport;
