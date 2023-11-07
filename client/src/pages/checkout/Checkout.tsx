import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { CartItem } from "./CartItem";

const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();

  const totalAmount = getTotalCartAmount();
  return (
    <div>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div>
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product={product} />;
          }
        })}
      </div>

      <div>
        <p>Subtotal: ${totalAmount}</p>
        <button>Continue Shopping</button>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
