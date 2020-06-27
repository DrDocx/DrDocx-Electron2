import axios from "axios";
import {testApiUrl, testsApiUrl} from "./service-routes";

class TestsService {
    static async getTests() {
        return axios.get(testsApiUrl).then(response => response.data);
    }

    static async getTest(id) {
        return axios.get(testApiUrl(id)).then(response => response.data);
    }

    static async updateTest(test) {
        return axios.put(testApiUrl(test.id), test).then(response => response.data);
    }

    static async createTest(test) {
        return axios.post(testsApiUrl, test).then(response => response.data);
    }

    static async deleteTest(id) {
        return axios.delete(testApiUrl(id)).then(response => response.data);
    }
}

export default TestsService;
