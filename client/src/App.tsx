import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/Auth";
import ShopPage from "./pages/shop/Shop";
import CheckoutPage from "./pages/checkout/Checkout";
import PurchasedItemsPage from "./pages/PurchasedItems";
/* import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */
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
            <Route path="/auth" element={<AuthPage />} />
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
