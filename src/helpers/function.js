import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const calcSubPrice = (product) => +product.count * +product.item.price;

export const calcTotalCount = (product) => {
  return product.reduce((acc, el) => {
    return (acc += el.subPrice);
  }, 0);
};

export const ProtectedRoutes = () => {
  const { user } = useAuth();
  function isAllow() {
    if (user.email === "islam555@gmail.com" && user.password === "js5abcd") {
      return true;
    } else {
      return false;
    }
  }
  return isAllow() ? <Outlet /> : <Navigate to="/register" />;
};
