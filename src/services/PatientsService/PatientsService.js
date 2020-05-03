import axios from "axios";
import {patientApiUrl} from "../service-constants";

class PatientsService {
    static patientUrl(id) {
        return `${patientApiUrl}/${id}`;
    }

    static async getPatients() {
        return axios.get(patientApiUrl).then(response => response.data);
    }

    static async getPatient(id) {
        return axios.get(this.patientUrl(id)).then(response => response.data);
    }

    static async updatePatient(id, patient) {

    }

    static async createPatient(patient) {

    }
}

export default PatientsService;

