import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import shoppingCart from "../assets/icons/MdiCartOutline.svg";
import menu from "../assets/icons/MdiMenu.svg";
import close from "../assets/icons/MdiClose.svg";
import { IShopContext, ShopContext } from "../context/shop-context";

const NavLinks = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated, cartQuantity } =
    useContext<IShopContext>(ShopContext);

  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/" className="text-white mb-4 lg:mb-0">
            Shop
          </Link>
          <Link to="/purchased-items" className="text-white mb-4 lg:mb-0">
            Purchases
          </Link>
          <Link to="/checkout" className="relative lg:flex hidden">
            <img src={shoppingCart} alt="shopping-cart" className="h-6 w-8" />
            <div className="rounded-full bg-emerald-600 flex justify-center items-center w-5 h-5 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
              <p className="text-white text-xs">{cartQuantity}</p>
            </div>
          </Link>
          <Link
            to="/login"
            onClick={logout}
            className="text-white mb-4 lg:mb-0"
          >
            Logout
          </Link>
          <span className="text-white mb-4 lg:mb-0">
            ${availableMoney.toFixed(2)}
          </span>
        </>
      ) : (
        <>
          <Link to="/" className="text-white mb-4 lg:mb-0">
            Shop
          </Link>
          <Link to="/register" className="text-white mb-4 lg:mb-0">
            Register
          </Link>
          <Link to="/login" className="text-white mb-4 lg:mb-0">
            Login
          </Link>
        </>
      )}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between shadow-sm shadow-gray-800 flex-wrap p-3 bg-black">
      <div className="flex w-1/3 justify-start items-center space-x-2 pl-2 pt-2 md:pl-0 md:pt-0">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/">
          <h1 className="hidden sm:flex text-white text-lg">Stellar Style</h1>
        </Link>
      </div>
      <nav className="flex w-1/3 justify-end">
        <div
          className={
            isAuthenticated
              ? "hidden w-full justify-between lg:flex mr-2"
              : "hidden w-full justify-end space-x-5 lg:flex mr-2"
          }
        >
          <NavLinks />
        </div>
        <div className="lg:hidden">
          <div className="flex items-center">
            {isAuthenticated && (
              <Link to="/checkout" className="relative">
                <img
                  src={shoppingCart}
                  alt="shopping-cart"
                  className="h-9 w-9 mr-7"
                />
                <div className="rounded-full bg-emerald-600 flex justify-center items-center w-5 h-5 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 mr-7">
                  <p className="text-white text-xs">3</p>
                </div>
              </Link>
            )}

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
