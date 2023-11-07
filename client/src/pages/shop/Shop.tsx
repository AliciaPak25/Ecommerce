import { useGetProducts } from "../../hooks/useGetProducts";
import Product from "./Product";

const ShopPage = () => {
  const { products } = useGetProducts();
  return (
    <div>
      <div>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
