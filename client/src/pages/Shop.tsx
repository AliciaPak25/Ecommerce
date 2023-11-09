import { useGetProducts } from "../hooks/useGetProducts";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { Navigate } from "react-router-dom";

const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Hero />
      <div className="mt-28 w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
