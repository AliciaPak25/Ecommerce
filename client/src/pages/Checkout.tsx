import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import { CartItem } from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  return (
    <div>
      <div>
        <h1 className="text-center text-xl md:text-3xl mt-8 font-bold text-emerald-500">
          Your Cart Items
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="md:text-2xl sm:text-xl text-base font-bold my-5">
            Subtotal: ${totalAmount.toFixed(2)}
          </p>
          <div className="my-5 flex sm:flex-row flex-col">
            <button
              onClick={() => navigate("/")}
              className="w-40 h-14 bg-black text-white border-0 rounded-lg m-2.5 hover:bg-emerald-500"
            >
              Continue Shopping
            </button>
            <button
              onClick={checkout}
              className="w-40 h-14 bg-black text-white border-0 rounded-lg m-2.5 hover:bg-emerald-500"
            >
              Purchase Now
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-lg md:text-2xl mt-36 uppercase">
          Your Shopping Cart is Empty.
        </h1>
      )}
    </div>
  );
};

export default CheckoutPage;
