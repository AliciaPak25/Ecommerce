import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";

const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount } =
    useContext<IShopContext>(ShopContext);
  return (
    <div className="pb-16">
      <h1 className="text-center text-xl md:text-3xl mt-8 font-bold text-emerald-500">
        Previously Purchased Items
      </h1>
      <div className="mt-24 w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
        {purchasedItems.map((item) => {
          const count = getCartItemCount(item._id);
          return (
            <div
              key={item._id}
              className="flex flex-col items-center justify-center mb-14 p-1 rounded-sm shadow-sm shadow-emerald-400"
            >
              <h3 className="text-center font-bold text-lg mb-2">
                {item.productName}
              </h3>
              <img src={item.imageURL} className="w-52 h-52 mb-5" />
              <p className="text-center text-base font-semibold mb-1">
                ${item.price}
              </p>
              <button
                onClick={() => addToCart(item._id)}
                className="bg-black border-2 border-solid text-white min-w-[100px] px-2.5 py-1.5 rounded-2xl hover:bg-emerald-500 mb-4"
              >
                Purchase Again {count > 0 && <>({count})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchasedItemsPage;
