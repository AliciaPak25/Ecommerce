import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import shoppingCart from "../assets/icons/MdiCartOutline.svg";
import menu from "../assets/icons/MdiMenu.svg";
import close from "../assets/icons/MdiClose.svg";

const NavLinks = () => {
  return (
    <>
      <Link to="/" className="">
        Home
      </Link>
      <Link to="/" className="">
        Products
      </Link>
      <Link to="/" className="">
        Contact
      </Link>
      <Link to="/purchased-items" className="">
        Purchases
      </Link>
      <Link to="/checkout">
        <img src={shoppingCart} alt="shopping-cart" className="h-6 w-6" />
      </Link>
      <Link to="/" className="">
        Log in
      </Link>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b border-gray-500 p-0 flex-wrap md:p-6">
      <div className="flex w-1/3 justify-start items-center space-x-2 pl-2 pt-2 md:pl-0 md:pt-0">
        <Logo />
        <h1 className="hidden md:flex">Ecommerce Shop</h1>
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
