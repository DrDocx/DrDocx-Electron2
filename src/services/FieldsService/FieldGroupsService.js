import axios from "axios";
import {fieldGroupApiUrl, fieldGroupDefaultsApiUrl, fieldGroupsApiUrl} from "../service-constants";

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

    static async updateFieldGroup(id, fieldGroup) {

    }

    static async createFieldGroup(fieldGroup) {

    }
}

export default FieldGroupsService;
