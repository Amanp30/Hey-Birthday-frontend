import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./Context";

function AppProvider({ children }) {
  const [state, setState] = useState({
    profile: Cookies.get("profile"),
    theme: Cookies.get("brtheme"),
    name: Cookies.get("name"),
  });
  const updateAccDetails = () => {
    setState({
      profile: Cookies.get("profile"),
      theme: Cookies.get("brtheme"),
      name: Cookies.get("name"),
    });
  };

  useEffect(() => {
    var html = document.documentElement;
    if (state.theme === "Dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    return () => {};
  }, [state]);

  // notification here
  const [Notification, setNotification] = useState({
    message: "",
    type: "",
    show: false,
  });

  const Notify = (message, type) => {
    setNotification({ message: message, type: type, show: true });
  };
  const CloseNotify = () => {
    setNotification({ message: "", type: "", show: false });
  };

  return (
    <AppContext.Provider
      value={{ state, Notification, Notify, CloseNotify, updateAccDetails }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
