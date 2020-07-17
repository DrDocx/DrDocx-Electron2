import axios from "axios";
import {testGroupApiUrl, testGroupsApiUrl} from "./service-routes";

class TestGroupsService {
    static async getTestGroups(includeTests, isDefault) {
        const reqParams = {
            isDefault: isDefault ? '1' : '0',
            includeTests: includeTests ? '1' : '0'
        }
        return axios.get(testGroupsApiUrl, {params: reqParams}).then(response => response.data);
    }

    static async getTestGroup(id) {
        return axios.get(testGroupApiUrl(id)).then(response => response.data);
    }

    static async getDefaultTestGroups() {
        return this.getTestGroups(false, true);
    }

    static async getFullTestGroups() {
        return this.getTestGroups(true, false);
    }

    static async updateTestGroup(testGroup) {
        return axios.put(testGroupApiUrl(testGroup.id), testGroup).then(response => response.data);
    }

    static async createTestGroup(testGroup) {
        return axios.post(testGroupsApiUrl, testGroup).then(response => response.data);
    }

    static async deleteTestGroup(id) {
        return axios.delete(testGroupApiUrl(id)).then(response => response.data);
    }
}

export default TestGroupsService;
