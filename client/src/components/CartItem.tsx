import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { IProduct } from "../models/interfaces";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, imageURL, productName, price } = props.product;
  const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div
      className="w-[700px] h-64 flex items-center shadow-lg
    shadow-[rgba(0, 0, 0, 0.2)] rounded-bl-3xl m-8"
    >
      <img
        src={imageURL}
        alt="clothing-product-image"
        className=" w-52 ml-14"
      />
      <div className="width-full text-3xl">
        <h3>{productName}</h3>
        <p>Price: ${price}</p>
      </div>
      <div>
        <button onClick={() => removeFromCart(_id)}>-</button>
        <input
          type="number"
          value={cartItemCount}
          onChange={(event) =>
            updateCartItemCount(Number(event.target.value), _id)
          }
          className="w-10 text-center font-bold"
        />
        <button onClick={() => addToCart(_id)}>+</button>
      </div>
    </div>
  );
};
