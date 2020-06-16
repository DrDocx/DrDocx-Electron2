import axios from "axios";
import {fieldGroupApiUrl, fieldGroupDefaultsApiUrl, fieldGroupsApiUrl} from "../service-routes";

class FieldGroupsService {
    static fieldGroupUrl(id) {
        return `${fieldGroupApiUrl}/${id}`;
    }

    static async getFieldGroups() {
        return axios.get(fieldGroupsApiUrl).then(response => response.data);
    }

    static async getDefaultFieldGroups() {
        return axios.get(fieldGroupDefaultsApiUrl).then(response => response.data);
    }

    static async getFieldGroup(id) {
        return axios.get(fieldGroupApiUrl(id)).then(response => response.data);
    }

    static async deleteFieldGroup(id) {
        return axios.delete(fieldGroupApiUrl(id)).then(response => response.data);
    }

    static async updateFieldGroup(fieldGroup) {
        return axios.put(fieldGroupApiUrl(fieldGroup.id), fieldGroup).then(response => response.data);
    }

    static async createFieldGroup(fieldGroup) {
        return axios.post(fieldGroupsApiUrl, fieldGroup).then(response => response.data);
    }
}

export default FieldGroupsService;
