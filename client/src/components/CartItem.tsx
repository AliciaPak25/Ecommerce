import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { IProduct } from "../models/interfaces";
import trashCan from "../assets/icons/IcBaselineDelete.svg";

interface Props {
  product: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, imageURL, productName, price } = props.product;
  const {
    addToCart,
    decreaseCartQuantity,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
  } = useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div
      className="w-[320px] sm:w-[600px] md:w-[700px] h-64 flex items-center shadow-lg
    shadow-[rgba(0, 0, 0, 0.2)] rounded-3xl m-8"
    >
      <img
        src={imageURL}
        alt="clothing-product-image"
        className="w-28 h-40 sm:w-52 sm:h-60 sm:ml-14 ml-4 rounded-sm"
      />
      <div className="ml-3">
        <h3 className="md:text-lg sm:text-base text-sm text-black/75">
          {productName}
        </h3>
        <p className="text-gray-400 md:text-base sm:text-sm text-xs">
          ${price}
        </p>
      </div>
      <div className="flex sm:flex-row flex-col justify-center items-center sm:ml-3 md:ml-10 ml-3 sm:mb-5">
        <button
          onClick={() => decreaseCartQuantity(_id)}
          className="text-[#1cc49d] bg-[#1b2f31]  flex justify-center items-center h-7 w-7 text-xl font-semibold "
        >
          -
        </button>
        <input
          type="number"
          value={cartItemCount}
          onChange={(event) =>
            updateCartItemCount(Number(event.target.value), _id)
          }
          className="md:pl-2 w-5 sm:w-10 md:w-14 text-center font-bold border-y-2 border-y-[#1b2f31] h-7 md:text-base sm:text-sm text-xs"
        />
        <button
          onClick={() => addToCart(_id)}
          className="text-[#1cc49d] bg-[#1b2f31]  flex justify-center items-center h-7 w-7 text-xl font-semibold"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(_id)}
          className="border-2 border-gray-500 flex justify-center items-center h-9 w-9 text-xl p-1 rounded-md font-semibold hover:bg-red-500 sm:ml-3 md:ml-5 sm:mt-0 mt-3"
        >
          <img src={trashCan} alt="trash-can-image" />
        </button>
      </div>
    </div>
  );
};
