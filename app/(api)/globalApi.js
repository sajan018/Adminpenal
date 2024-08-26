const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL:'https://adminpenal-backend-ybav.onrender.com'
});
const createProduct=(data)=>axiosClient.post('/product',data);
const getAllProduct=()=>axiosClient.get('/product');
const deleteProduct = (productId) => axiosClient.delete(`/product/${productId}`);
const getAdminUser =()=>axiosClient.get('/admin');
export default {createProduct , getAllProduct , getAdminUser , deleteProduct};