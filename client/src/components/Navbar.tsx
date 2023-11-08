import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import shoppingCart from "../assets/icons/MdiCartOutline.svg";
import menu from "../assets/icons/MdiMenu.svg";
import close from "../assets/icons/MdiClose.svg";
import { IShopContext, ShopContext } from "../context/shop-context";

const NavLinks = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);

  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <>
      <Link to="/" className="text-white">
        Shop
      </Link>
      {!isAuthenticated && (
        <Link to="/login" className="text-white">
          Login
        </Link>
      )}
      {isAuthenticated && (
        <>
          <Link to="/purchased-items" className="text-white">
            Purchases
          </Link>
          <Link to="/checkout">
            <img src={shoppingCart} alt="shopping-cart" className="h-6 w-6" />
          </Link>
          <Link to="/login" onClick={logout} className="text-white">
            Logout
          </Link>
          <span className="text-white">${availableMoney.toFixed(2)}</span>
        </>
      )}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between shadow-sm shadow-gray-800 p-0 flex-wrap md:p-3 bg-black">
      <div className="flex w-1/3 justify-start items-center space-x-2 pl-2 pt-2 md:pl-0 md:pt-0">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/">
          <h1 className="hidden md:flex text-white">Stellar Style</h1>
        </Link>
      </div>
      <nav className="flex w-1/3 justify-end">
        <div className="hidden w-full justify-between md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <div className="flex items-center">
            <Link to="#">
              <img
                src={shoppingCart}
                alt="shopping-cart"
                className="h-9 w-9 mr-2"
              />
            </Link>
            <button onClick={toggleNavbar}>
              {isOpen ? (
                <img src={close} alt="close-icon" className="h-10 w-10" />
              ) : (
                <img src={menu} alt="menu-icon" className="h-10 w-10" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center">
          <NavLinks />
        </div>
      )}
    </div>
  );
};

export default Navbar;
