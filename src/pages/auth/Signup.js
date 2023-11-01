import { useState } from "react";
import { Link } from "react-router-dom";
import { SingupEndpoint } from "../../Services/auth/endPoint";
import {
  formSaveClassNames,
  inputClassNames,
  labelClassNames,
} from "../../utilities/ClassNamesCollection";
import FailedErrorMessage from "../../utilities/FailedErrorMessage";
import LogError from "../../utilities/LogError";

function Signup() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [responseData, setResponseData] = useState({ message: "", status: "" });

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    SingupEndpoint(formData)
      .then((response) => {
        console.log("Signup successful", response);

        setData({ email: "", password: "" });
        setResponseData({
          message: response.message,
          type: "success",
        });
        // setData(data);
      })
      .catch((error) => {
        setResponseData({
          message: error?.response?.data?.message || FailedErrorMessage,
          type: "error",
        });
        LogError(error);
      });
  };

  return (
    <div className=" flex  flex-1 flex-col justify-center px-10  pt-20 lg:px-8 max-sm:pt-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-9">
          Sign Up - Create new Account
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
        <form className="space-y-6" onSubmit={handleSignup}>
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
              value={"Create Account"}
              className={formSaveClassNames}
            />
          </div>
        </form>

        <p className="mt-10 mb-20 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {" Login Here"}
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
