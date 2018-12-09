import axios from 'axios';
import {apiEndpoint} from "../../config";

export const getCategories = () => axios.get(`${apiEndpoint}/categories`);