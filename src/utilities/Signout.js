import Cookies from "js-cookie";

const SignOut = () => {
  Cookies.remove("name");
  Cookies.remove("profile");
  Cookies.remove("profiletoken");
  Cookies.remove("brtheme");
  Cookies.remove("token");
  Cookies.remove("userid");

  window.location.href = "/auth/login";
};

export default SignOut;
