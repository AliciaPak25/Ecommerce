import axios from "axios";

const url = "http://localhost:5000/product";

export const fetchProducts = () => axios.get(url);
