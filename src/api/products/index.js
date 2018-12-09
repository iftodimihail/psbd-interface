import axios from 'axios';
import {apiEndpoint} from "../../config";

export const getCategoryProducts = (categoryId) => axios.get(`${apiEndpoint}/products`, {
  params: {
    categoryId
  }
});
export const getProduct = (id) => axios.get(`${apiEndpoint}/${id}`);