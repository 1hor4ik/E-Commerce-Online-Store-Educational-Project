import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarLayout from "./layouts/NavbarLayout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ShopPage from "./pages/ShopPage";
import { CategoryProvider } from "./components/CategoryContext";

const App: React.FC = () => {
  return (
    <CategoryProvider>
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </CategoryProvider>
  );
};

export default App;
