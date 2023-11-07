import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { IProduct } from "../../models/interfaces";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, imageURL, productName, price } = props.product;
  const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div>
      <img src={imageURL} alt="clothing-product-image" />
      <div>
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
        />
        <button onClick={() => addToCart(_id)}>+</button>
      </div>
    </div>
  );
};
