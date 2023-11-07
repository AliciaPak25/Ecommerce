import { useState, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../models/interfaces";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get("http://localhost:5000/product");
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      alert("ERROR: Something went wrong.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};
