import axios from "axios";
import {reportApiUrl, reportsApiUrl} from "./service-routes";

class ReportsService {
    static async getReports() {
        return axios.get(reportsApiUrl).then(response => response.data);
    }

    static async getReport(id) {
        return axios.get(reportApiUrl(id)).then(response => response.data);
    }

    static async updateReport(report) {
        return axios.put(reportApiUrl(report.id), report).then(response => response.data);
    }

    static async createReport(report) {
        return axios.post(reportsApiUrl, report).then(response => response.data);
    }

    static async deleteReport(id) {
        return axios.delete(reportApiUrl(id)).then(response => response.data);
    }
}

export default ReportsService;
