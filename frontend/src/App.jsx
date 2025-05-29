import React from "react";
import RootLayout from "./pages/RootLayout.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import LogInPage from "./pages/LogInPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/Categories/CategoriesPage.jsx";
import BooksPage from "./pages/BooksPage/index.jsx";
import CoffeePage from "./pages/CoffeePage/index.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import WishList from "./pages/WishlistPage.jsx";
import ExplorePage from "./pages/ExplorePage/ExplorePage.jsx";
import Cart from "./pages/CartPage/CartPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppWrapper } from "./AppStyles";
import AuthProvider from "./contexts/AuthContext.jsx";
import { GlobalStyle } from "../GlobalStyle.js";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";

const routesDestinations = createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/register" element={<RegisterPage />}></Route>
    <Route path="/login" element={<LogInPage />}></Route>
    <Route path="/services" element={<ServicesPage />}></Route>
    <Route path="/categories" element={<CategoriesPage />}></Route>
    <Route path="/booksHomePage" element={<BooksPage />}></Route>
    <Route path="/coffeeHomePage" element={<CoffeePage />}></Route>
    <Route path="/profile" element={<ProfilePage />}></Route>
    <Route path="/wishlist" element={<WishList />}></Route>
    <Route path="/cart" element={<Cart />}></Route>
    <Route path="/explore" element={<ExplorePage />}></Route>
    <Route path="/aboutUs" element={<AboutPage />}></Route>
    <Route path="/product/:id" element={<ProductPage />}></Route>
    <Route path="*" element={<NotFoundPage />}></Route>
  </Route>
);
const router = createBrowserRouter(routesDestinations);
function App() {
  return (
    <AuthProvider>
      <AppWrapper>
        <GlobalStyle />
        <RouterProvider router={router}></RouterProvider>
      </AppWrapper>
    </AuthProvider>
  );
}

export default App;