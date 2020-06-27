import axios from "axios";
import {reportApiUrl, reportsApiUrl, reportsDownloadApiUrl, reportsUploadApiUrl} from "./service-routes";

class ReportsService {
    static async getReportTemplates() {
        return axios.get(reportsApiUrl).then(response => response.data);
    }

    static async getReportTemplate(id) {
        return axios.get(reportApiUrl(id)).then(response => response.data);
    }

    static async updateReportTemplate(reportTemplate) {
        return axios.put(reportApiUrl(reportTemplate.id), reportTemplate).then(response => response.data);
    }

    static async createReportTemplate(reportTemplate, templateFile) {
        const formData = new FormData();
        formData.set('garbage', 'garbage'); // There is a bug in ASP.NET Core that causes the first field in a multiform-data request to be ignored. This pads it out to work around that.
        formData.set('templateName', reportTemplate.name);
        formData.append('templateFile', templateFile);
        return axios.post(reportsUploadApiUrl, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data);
    }

    static async deleteReportTemplate(id) {
        return axios.delete(reportApiUrl(id)).then(response => response.data);
    }

    static async generateReport(reportTemplateId, patientId) {
        return axios.get(reportsDownloadApiUrl(reportTemplateId, patientId), {responseType: "blob"});
    }
}

export default ReportsService;

