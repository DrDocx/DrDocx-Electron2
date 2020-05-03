import axios from "axios";
import {fieldValueGroupApiUrl, fieldValueGroupsApiUrl} from "../service-constants";

class FieldValueGroupsService {
    static async getFieldValueGroups() {
        return axios.get(fieldValueGroupsApiUrl).then(response => response.data);
    }

    static async getFieldValueGroup(id) {
        return axios.get(fieldValueGroupApiUrl(id)).then(response => response.data);
    }

    static async updateFieldValueGroup(id, fieldValueGroup) {

    }

    static async createFieldValueGroup(fieldValueGroup) {

    }
}

export default FieldValueGroupsService;
