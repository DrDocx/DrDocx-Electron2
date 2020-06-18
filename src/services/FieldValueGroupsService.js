import axios from "axios";
import {fieldValueGroupApiUrl, fieldValueGroupsApiUrl, fieldValueGroupsBatchApiUrl} from "./service-routes";

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
        for (const fvg of fieldValueGroups) {
            axios.delete(fieldValueGroupApiUrl(fvg.id)).then(response => response.data);
        }
    }
}

export default FieldValueGroupsService;
