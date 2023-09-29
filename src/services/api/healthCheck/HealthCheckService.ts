import axios from 'axios'

export const getPage = () => {
    return axios.get(`/`);
}