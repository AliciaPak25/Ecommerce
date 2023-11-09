import { useState, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../models/interfaces";
import { useNavigate } from "react-router-dom";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get(
        "https://stellar-style-api.vercel.app/product"
      );
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      console.log("ERROR: Something went wrong.");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};
