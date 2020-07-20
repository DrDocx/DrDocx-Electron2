import axios from "axios";
import qs from "qs";
import {fieldGroupApiUrl,
    fieldGroupDefaultsApiUrl,
    fieldGroupsApiUrl,
    fieldGroupDownloadApiUrl,
} from "./service-routes";

class FieldGroupsService {
    static fieldGroupUrl(id) {
        return `${fieldGroupApiUrl}/${id}`;
    }

    static async getFieldGroups(includeFields, isDefault) {
        const reqParams = {
            isDefault: isDefault ? '1' : '0',
            includeFields: includeFields ? '1' : '0'
        }
        return axios.get(fieldGroupsApiUrl, {params: reqParams}).then(response => response.data);
    }

    static async getDefaultFieldGroups() {
        return this.getFieldGroups(true, true)
    }

    static async getFullFieldGroups() {
        return this.getFieldGroups(true, false);
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

    static async exportFieldGroups(fieldGroupIds) {
        return axios.get(fieldGroupDownloadApiUrl, {
            responseType: "blob",
            params: {
                fieldGroupIds: fieldGroupIds
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        });
    }
}

export default FieldGroupsService;
