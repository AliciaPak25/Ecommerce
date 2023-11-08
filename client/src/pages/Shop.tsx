import { useGetProducts } from "../hooks/useGetProducts";
import Product from "../components/Product";

const ShopPage = () => {
  const { products } = useGetProducts();
  return (
    <div>
      <div className="mt-28 w-full h-auto grid grid-cols-3 place-items-center">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
