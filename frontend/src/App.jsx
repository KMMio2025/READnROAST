import React from "react";
import RootLayout from "./pages/RootLayout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import LogInPage from "./pages/LogInPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import CoffeePage from "./pages/CoffeePage.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppWrapper } from "./AppStyles";

const routesDestinations = createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/about" element={<AboutPage />}></Route>
    <Route path="/register" element={<RegisterPage />}></Route>
    <Route path="/login" element={<LogInPage />}></Route>
    <Route path="/services" element={<ServicesPage />}></Route>
    <Route path="/categories" element={<CategoriesPage />}></Route>
    <Route path="/booksHomePage" element={<BooksPage />}></Route>
    <Route path="/coffeeHomePage" element={<CoffeePage />}></Route>
  </Route>
);
const router = createBrowserRouter(routesDestinations);
function App() {
  return (
    <AppWrapper>
      <RouterProvider router={router}></RouterProvider>
    </AppWrapper>
  );
}

export default App;
