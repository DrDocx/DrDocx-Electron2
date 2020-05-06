import axios from "axios";
import {fieldValueGroupApiUrl, fieldValueGroupsApiUrl} from "../service-constants";

class FieldValueGroupsService {
    static async getFieldValueGroups() {
        return axios.get(fieldValueGroupsApiUrl).then(response => response.data);
    }

    static async getFieldValueGroup(id) {
        return axios.get(fieldValueGroupApiUrl(id)).then(response => response.data);
    }

    static async updateFieldValueGroup(fieldValueGroup) {

    }

    static async createFieldValueGroup(fieldValueGroup) {
    }

    static async deleteFieldValueGroup(fieldValueGroup) {
        return axios.delete(fieldValueGroupApiUrl(fieldValueGroup.id)).then(response => response.data);
    }

    static async deleteMultipleFieldValueGroups(fieldValueGroups) {
        return axios.delete(fieldValueGroupsApiUrl, fieldValueGroups).then(response => response.data);
    }
}

export default FieldValueGroupsService;
