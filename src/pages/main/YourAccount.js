import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Components/APP/Context";
import HeaderSection from "../../Components/HeaderSection";
import LoadingData from "../../Components/LoadingData";
import {
  AccountDetailsEndpoint,
  UpdateAccountEndpoint,
} from "../../Services/account";
import countryMobileCodes, { monthsFullArray } from "../../utilities/AllArrays";
import {
  formSaveClassNames,
  inputClassNames,
  labelClassNames,
} from "../../utilities/ClassNamesCollection";
import FailedErrorMessage from "../../utilities/FailedErrorMessage";
import LogError from "../../utilities/LogError";
import capitalizeFirstLetter from "../../utilities/capitalizeFirstLetter";

function YourAccount() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { updateAccDetails, Notify } = useContext(AppContext);

  useEffect(() => {
    const userid = Cookies.get("userid");
    AccountDetailsEndpoint(userid)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        LogError(error);
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const userid = Cookies.get("userid");

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    UpdateAccountEndpoint(userid, formData)
      .then((response) => {
        Cookies.set("brtheme", data?.preferences?.theme, {
          expires: 1,
          path: "/",
        });
        Cookies.set("profile", data.profilePicture, {
          expires: 1,
          path: "/",
        });
        Cookies.set("name", data.firstName, { expires: 1, path: "/" });
        Cookies.set("country", data.country, { expires: 1, path: "/" });
        updateAccDetails();
        Notify(response.message, "success");
      })
      .catch((error) => {
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
        // LogError(error);
      });
  };

  return (
    <div>
      <HeaderSection text="Your Account" />

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-0">
        <LoadingData isLoading={loading}>
          <div className="ml-0 max-w-3xl px-2 py-2 lg:py-6 sm:px-6 lg:px-8 ">
            <form className="space-y-6" onSubmit={handleForm}>
              {/* fistName and lastname */}
              <div className="flex gap-5 ">
                <div className="w-full">
                  <label htmlFor="firstName" className={labelClassNames}>
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      value={data?.firstName}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          firstName: capitalizeFirstLetter(e.target.value),
                        }))
                      }
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="firstName"
                      required
                      className={inputClassNames}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <label htmlFor="lastName" className={labelClassNames}>
                      Last Name
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      value={data?.lastName}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          lastName: capitalizeFirstLetter(e.target.value),
                        }))
                      }
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="current-lastName"
                      required
                      className={inputClassNames}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-full">
                  <label htmlFor="selectDate" className={labelClassNames}>
                    Date{" "}
                  </label>
                  <div className=" mt-2">
                    <select
                      required
                      name="selectDate"
                      className={inputClassNames}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          dob: { ...pd.dob, date: e.target.value },
                        }))
                      }
                      value={data?.dob?.date}
                    >
                      <option value={""}></option>
                      {Array.from({ length: 31 }, (_, index) => index + 1).map(
                        (item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="selectDate" className={labelClassNames}>
                    Month{" "}
                  </label>
                  <div className=" mt-2">
                    <select
                      required
                      name="selectDate"
                      className={inputClassNames}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          dob: { ...pd.dob, month: e.target.value },
                        }))
                      }
                      value={data?.dob?.month}
                    >
                      <option value={""}></option>
                      {Array.from({ length: 12 }, (_, index) => (
                        <option key={index} value={index + 1}>
                          {monthsFullArray[index]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>{" "}
                <div className="w-full">
                  <label htmlFor="selectDate" className={labelClassNames}>
                    Year{" "}
                  </label>
                  <div className=" mt-2">
                    <select
                      required
                      name="selectDate"
                      className={inputClassNames}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          dob: { ...pd.dob, year: e.target.value },
                        }))
                      }
                      value={data?.dob?.year}
                    >
                      <option value={""}></option>
                      {Array.from(
                        { length: new Date().getFullYear() - 1890 + 1 },
                        (_, index) => new Date().getFullYear() - index
                      ).map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>{" "}
              </div>

              <hr className="h-2" />

              <div>
                <div className="w-full lg:w-1/2">
                  <label htmlFor="selectDate" className={labelClassNames}>
                    Theme{" "}
                  </label>
                  <div className=" mt-2">
                    <select
                      required
                      name="selectDate"
                      className={inputClassNames}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          preferences: {
                            ...pd.preferences,
                            theme: e.target.value,
                          },
                        }))
                      }
                      value={data.preferences?.theme}
                    >
                      <option value={"Dark"}>Dark</option>
                      <option value={"Light"}>Light</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full lg:w-1/2 ">
                  <label htmlFor="selectDate" className={labelClassNames}>
                    Country{" "}
                  </label>
                  <div className=" mt-2">
                    <select
                      required
                      name="selectDate"
                      className={inputClassNames}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          country: e.target.value,
                        }))
                      }
                      value={data.country}
                    >
                      <option value={""}></option>

                      {countryMobileCodes.map((item, index) => (
                        <option key={index} value={item.country}>
                          {item.country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <hr className="my-5" />

              <div className="flex gap-5">
                <div>
                  <div className="w-full ">
                    <label htmlFor="selectDate" className={labelClassNames}>
                      Country{" "}
                    </label>
                    <div className=" mt-2">
                      <select
                        required
                        name="selectDate"
                        className={inputClassNames}
                        onChange={(e) =>
                          setData((pd) => {
                            const value = e.target.value;
                            const codeArray = countryMobileCodes.find(
                              (item) => item.country === value
                            );
                            return {
                              ...pd,
                              mobno: {
                                ...pd.mobno,
                                country: value,
                                code: codeArray ? codeArray.code : "",
                              },
                            };
                          })
                        }
                        value={data?.mobno?.country}
                      >
                        <option value={""}></option>

                        {countryMobileCodes.map((item, index) => (
                          <option key={index} value={item.country}>
                            {item.country} {item.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <label htmlFor="mobileno" className={labelClassNames}>
                      Mobile No.
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      value={data?.mobno?.mobileno}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!isNaN(value) && value.length <= 10 && value >= 0) {
                          setData((pd) => ({
                            ...pd,
                            mobno: {
                              ...pd.mobno,
                              mobileno: value,
                            },
                          }));
                        }
                      }}
                      id="mobileno"
                      name="mobileno"
                      type="number"
                      maxLength={10}
                      autoComplete="current-mobileno"
                      required
                      className={inputClassNames}
                    />
                  </div>
                </div>
              </div>

              <div className=" w-full fixed bottom-0 left-0 right-0 sm:relative py-2 px-6  	sm:p-0">
                <input
                  disabled={data ? false : true}
                  type="submit"
                  value={"Update Details"}
                  className={formSaveClassNames + " w-full lg:w-1/2"}
                />
              </div>
            </form>
            {/* {JSON.stringify(data)} */}
          </div>
        </LoadingData>
      </div>
    </div>
  );
}
export default YourAccount;
