import axios from 'axios';
import {apiEndpoint} from "../../config";

export const postBill = (data) => axios.post(`${apiEndpoint}/bills`, data);
export const getBills = () => axios.get(`${apiEndpoint}/bills`);
export const findBill = (id) => axios.get(`${apiEndpoint}/bills/${id}`);