import axios from "axios";
import {fieldApiUrl, fieldsApiUrl} from "../service-routes";

class FieldsService {
    static async getFields() {
        return axios.get(fieldsApiUrl).then(response => response.data);
    }

    static async getField(id) {
        return axios.get(fieldApiUrl(id)).then(response => response.data);
    }

    static async updateField(field) {
        return axios.put(fieldApiUrl(field.id), field).then(response => response.data);
    }

    static async createField(field) {
        return axios.post(fieldsApiUrl, field).then(response => response.data);
    }

    static async deleteField(id) {
        return axios.delete(fieldApiUrl(id)).then(response => response.data);
    }
}

export default FieldsService;
