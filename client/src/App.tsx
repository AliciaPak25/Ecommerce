import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ShopPage from "./pages/Shop";
import CheckoutPage from "./pages/Checkout";
import PurchasedItemsPage from "./pages/PurchasedItems";
import "./App.css";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <div className="w-full">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;

// Integrate Paypal
/* Some features I can add: 
- Make the UI look better.
- Add the functionality of actually purchasing items.
- Add the functionality of logging in as an admin and adding the products from inside of the web page.
*/
