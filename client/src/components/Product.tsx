import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { IProduct } from "../models/interfaces";

interface Props {
  product: IProduct;
}

const Product = (props: Props) => {
  const { _id, productName, descripton, price, stockQuantity, imageURL } =
    props.product;

  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);

  const count = getCartItemCount(_id);
  console.log(count);

  return (
    <div className="rounded-ss-2xl w-80 m-28 mt-1 flex flex-col justify-center items-center hover:border hover:shadow-md hover:shadow-emerald-400 transition-color duration-300 h-fit">
      <img src={imageURL} alt="clothing-product-image" className="w-80 h-96" />
      <div className="py-2">
        <h3 className="text-center font-bold text-lg">{productName}</h3>
        <p className="text-center text-sm text-gray-600">{descripton}</p>
        <p className="text-center text-base font-semibold">${price}</p>
      </div>
      <button
        onClick={() => addToCart(_id)}
        className="bg-transparent border-2 border-solid bg-[#131313] text-white min-w-[100px] px-2.5 py-1.5 rounded-2xl flex justify-center items-center hover:bg-emerald-500 mb-4"
      >
        Add To Cart {count > 0 && <>({count})</>}
      </button>

      <div>
        {stockQuantity === 0 && <h1 className="text-black">OUT OF STOCK</h1>}
      </div>
    </div>
  );
};

export default Product;
