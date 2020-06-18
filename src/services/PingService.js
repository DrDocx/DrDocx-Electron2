import axios from "axios";
import {pingApiUrl} from "./service-routes";

class PingService {
    static async pingApi() {
        return axios.get(pingApiUrl);
    }
}

export default PingService;
