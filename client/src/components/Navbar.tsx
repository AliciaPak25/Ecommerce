import { Link } from "react-router-dom";
import shoppingCart from "../assets/MdiCartVariant.svg";

const Navbar = () => {
  return (
    <div>
      <div>
        <h1>Ecommerce Shop</h1>
      </div>

      <div>
        <Link to="/">Shop</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout">
          <img src={shoppingCart} alt="shopping-cart" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
