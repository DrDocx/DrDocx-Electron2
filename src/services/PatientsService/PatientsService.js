import axios from "axios";
import {patientApiUrl, patientsApiUrl} from "../service-routes";

class PatientsService {

    static async getPatients() {
        return axios.get(patientsApiUrl).then(response => response.data);
    }

    static async getPatient(id) {
        return axios.get(patientApiUrl(id)).then(response => response.data);
    }

    static async updatePatient(patient) {
        return axios.put(patientApiUrl(patient.id), patient).then(response => response.data);
    }

    static async createPatient(patient) {
        return axios.post(patientsApiUrl, patient).then(response => response.data);
    }

    static async deletePatient(patient) {
        return axios.delete(patientApiUrl(patient.id)).then(response => response.data);
    }
}

export default PatientsService;

