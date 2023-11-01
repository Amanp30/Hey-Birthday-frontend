import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HandleRoutes() {
  const location = useLocation();

  useEffect(() => {
    const userid = Cookies.get("userid");
    const token = Cookies.get("token");
    const name = Cookies.get("name");

    const isProtectedRoute =
      location.pathname !== "/auth/login" &&
      location.pathname !== "/auth/signup";

    if (name && userid && token) {
      if (location.pathname === "/account/complete" && isProtectedRoute) {
        window.location.href = "/";
      }
    }

    if (!name && userid && token) {
      if (location.pathname !== "/account/complete" && isProtectedRoute) {
        window.location.href = "/account/complete";
      }
    }

    if (!userid || !token) {
      if (isProtectedRoute) {
        window.location.href = "/auth/login";
      }
    }
  }, [location.pathname]);

  return null;
}

export default HandleRoutes;
