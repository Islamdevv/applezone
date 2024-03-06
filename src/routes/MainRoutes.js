import React from "react";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../components/products/ListProduct";
import Admin from "../components/admin/Admin";
import EditProduct from "../components/products/EditProduct";
import DetailsPage from "../pages/DetailsPage";
import CardPage from "../pages/CardPage";
import LogIn from "../components/authetication/LogIn";
import Register from "../components/authetication/Register";
import { ProtectedRoutes } from "../helpers/function";

const MainRoutes = () => {
  const PUBLIC = [
    {
      link: "/menu",
      element: <ListProduct />,
      id: 2,
    },

    {
      link: "/details/:id",
      element: <DetailsPage />,
      id: 4,
    },
    {
      link: "/card",
      element: <CardPage />,
      id: 5,
    },
    {
      link: "/register",
      element: <Register />,
      id: 6,
    },
    {
      link: "/login",
      element: <LogIn />,
      id: 7,
    },
  ];

  const PRIVAT = [
    {
      link: "/admin",
      element: <Admin />,
      id: 1,
    },
    {
      link: "/edit/:id",
      element: <EditProduct />,
      id: 3,
    },
  ];

  return (
    <Routes>
      {PUBLIC.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
      <Route title={<ProtectedRoutes />}>
        {PRIVAT.map((item) => (
          <Route path={item.link} element={item.element} key={item.id} />
        ))}
      </Route>
    </Routes>
  );
};

export default MainRoutes;
