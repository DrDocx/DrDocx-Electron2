import axios from "axios";
import {fieldGroupApiUrl} from "../service-constants";

class FieldGroupsService {
    static fieldGroupUrl(id) {
        return `${fieldGroupApiUrl}/${id}`;
    }

    static async getFieldGroups() {
        return axios.get(fieldGroupApiUrl).then(response => response.data);
    }

    static async getFieldGroup(id) {
        return axios.get(this.fieldGroupUrl(id)).then(response => response.data);
    }

    static async updateFieldGroup(id, fieldGroup) {

    }

    static async createFieldGroup(fieldGroup) {

    }
}

export default FieldGroupsService;
