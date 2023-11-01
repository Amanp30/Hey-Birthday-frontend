import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginEndpoint } from "../../Services/auth/endPoint";
import LogError from "../../utilities/LogError";

import Cookies from "js-cookie";
import {
  formSaveClassNames,
  inputClassNames,
  labelClassNames,
} from "../../utilities/ClassNamesCollection";
import AppContext from "../../Components/APP/Context";
import FailedErrorMessage from "../../utilities/FailedErrorMessage";

function Login() {
  const [data, setData] = useState({
    email: "test@gmail.com",
    password: "yuasg465rsS#",
  });

  const [responseData, setResponseData] = useState({ message: "", status: "" });

  const { state } = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", data?.email);
    formData.append("password", data?.password);

    LoginEndpoint(formData)
      .then((response) => {
        Cookies.set("token", response.token, { expires: 1, path: "/" });
        Cookies.set("brtheme", response.theme, { expires: 1, path: "/" });
        Cookies.set("profile", response.profilePicture, {
          expires: 1,
          path: "/",
        });
        Cookies.set("userid", response.userid, { expires: 1, path: "/" });
        Cookies.set("name", response.name, { expires: 1, path: "/" });
        Cookies.set("country", response.country, { expires: 1, path: "/" });

        setData({ email: "", password: "" });

        setResponseData({
          message: response.message,
          type: "success",
        });

        const token = Cookies.get("token");
        const name = Cookies.get("name");

        if (!name) {
          window.location.href = "/account/complete";
        } else if (token) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        setResponseData({
          message: error?.response?.data?.message || FailedErrorMessage,
          type: "error",
        });
        LogError(error);
      });
  };

  if (state.name) {
    return (
      <>
        {" "}
        <div className=" flex  flex-1 flex-col justify-center px-10  pt-20 lg:px-8 max-sm:pt-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-9">
              Already signed in
            </h2>
            {state.name ? (
              <div className="mt-8 bg-slate-100 dark:bg-black p-4 rounded-xl  ">
                <div className="flex items-center gap-5">
                  <img
                    src={"http://localhost:8000" + state.profile}
                    className={
                      "w-[50px] h-[50px] rounded-full border border-zinc-700"
                    }
                  />{" "}
                  <p className="font-bold"> {state.name}</p>
                </div>
                <div className="flex justify-between gap-5 mt-6">
                  {" "}
                  <button
                    onClick={() => {
                      (function () {
                        const cookies = Cookies.get();

                        for (const cookieName in cookies) {
                          Cookies.remove(cookieName);
                        }

                        window.location.href = window.location.href;
                      })();
                    }}
                    className="py-2 w-full px-4 bg-red-600 text-white rounded-lg"
                  >
                    Sign Out{" "}
                  </button>
                  <Link
                    to={"/"}
                    className="py-2 w-full px-4 bg-gray-800 text-white rounded-lg"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              "asg"
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className=" flex  flex-1 flex-col justify-center px-10  pt-20 lg:px-8 max-sm:pt-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-9">
          Sign In - Login your Account
        </h2>
        {responseData?.type === "error" && (
          <div className="p-2 mt-4 rounded-lg bg-red-200 dark:bg-red-600">
            {responseData?.message}
          </div>
        )}
        {responseData?.type === "success" && (
          <div className="p-2 mt-4 rounded-lg bg-green-200 dark:bg-green-700">
            {responseData?.message}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className={labelClassNames}>
              Email address
            </label>
            <div className="mt-2">
              <input
                value={data?.email}
                onChange={(e) =>
                  setData((pd) => ({ ...pd, email: e.target.value }))
                }
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputClassNames}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className={labelClassNames}>
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                value={data?.password}
                onChange={(e) =>
                  setData((pd) => ({ ...pd, password: e.target.value }))
                }
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={inputClassNames}
              />
            </div>
          </div>

          <div>
            <input
              type="submit"
              value={"Login Your Account"}
              className={formSaveClassNames}
            />
          </div>
        </form>

        <p className="mt-10 mb-20 text-center text-sm text-gray-500">
          Not a member ?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {" Create free Account"}
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
