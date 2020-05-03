import axios from "axios";
import {patientApiUrl, patientsApiUrl} from "../service-constants";

class PatientsService {

    static async getPatients() {
        return axios.get(patientsApiUrl).then(response => response.data);
    }

    static async getPatient(id) {
        return axios.get(patientApiUrl(id)).then(response => response.data);
    }

    static async updatePatient(id, patient) {

    }

    static async createPatient(patient) {

    }
}

export default PatientsService;

