import axios from "axios";
import { CsvInput } from "../../../interfaces/data";

const DataService = {
    postData: function(dataBody: CsvInput) {
        return axios.post<string>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_POSTDATA}`, dataBody);
    },
}

export default DataService;