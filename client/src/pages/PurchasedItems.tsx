import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";

const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount } =
    useContext<IShopContext>(ShopContext);
  return (
    <div>
      <h1>Previously Purchased Items</h1>
      <div>
        {purchasedItems.map((item) => {
          const count = getCartItemCount(item._id);
          return (
            <div>
              <h3>{item.productName}</h3>
              <img src={item.imageURL} />
              <p>${item.price}</p>
              <button onClick={() => addToCart(item._id)}>
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
