import axios from "axios";
import {testGroupApiUrl, testGroupsApiUrl} from "./service-routes";

class TestGroupsService {
    static async getTestGroups() {
        return axios.get(testGroupsApiUrl).then(response => response.data);
    }

    static async getTestGroup(id) {
        return axios.get(testGroupApiUrl(id)).then(response => response.data);
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
