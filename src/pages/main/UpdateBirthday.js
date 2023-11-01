import HeaderSection from "../../Components/HeaderSection";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useContext, useEffect, useState } from "react";
import {
  formSaveClassNames,
  inputClassNames,
  labelClassNames,
} from "../../utilities/ClassNamesCollection";
import countryMobileCodes, {
  monthsFullArray,
  relationshipOptions,
} from "../../utilities/AllArrays";
import {
  getBirthdayData,
  newBirthdayEndpoint,
  updateBirthdayEndpoint,
} from "../../Services/Birthday";

import LogError from "../../utilities/LogError";
import AppContext from "../../Components/APP/Context";
import { useNavigate, useParams } from "react-router-dom";
import RequiredField from "../../Components/RequiredFields";
import logError from "../../utilities/LogError";
import FailedErrorMessage from "../../utilities/FailedErrorMessage";
import { BirthdayRequired } from "../../utilities/BirthdayRequired";
import { isValidDate } from "../../utilities/isValidDate";
import { validateMobileNumber } from "../../utilities/validateMobileNumber";
import LoadingData from "../../Components/LoadingData";

function UpdateBirthday() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    important: false,
    dob: { date: "", month: "", year: "" },
    relationship: "",
    mobno: {
      country: "",
      mobileno: "",
    },
  });

  const { Notify } = useContext(AppContext);
  const { id } = useParams();

  const Navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBirthdayData(id)
      .then((response) => {
        setLoading(false);
        setData(response);
      })
      .catch((error) => {
        LogError(error);
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  }, []);

  function goUpdateBirthday() {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    updateBirthdayEndpoint(id, formData)
      .then((response) => {
        Notify(response.message, "success");

        Navigate("/birthdays");
      })
      .catch((error) => {
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
        // LogError(error);
      });
  }

  const requiredFields = [
    { field: "firstName", message: "First Name is Required." },
    { field: "lastName", message: "Last Name is Required." },
    { field: "dob.date", message: "Date is Required." },
    { field: "dob.month", message: "Month is Required." },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await BirthdayRequired(data, requiredFields);

      validateMobileNumber(data);

      isValidDate(data?.dob);
    } catch (error) {
      Notify(error.message, "error");
      return;
    }

    goUpdateBirthday();
  };

  return (
    <>
      <HeaderSection text={"Edit Data"}></HeaderSection>

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-0">
        <LoadingData isLoading={loading}>
          <div className="mx-auto  max-w-3xl px-2 py-2 lg:py-6 sm:px-6 lg:px-8">
            <form className="space-y-6" /* onSubmit={(e) => handleLogin(e)} */>
              <div className="flex gap-5 ">
                <div className="w-full">
                  <label htmlFor="firstName" className={labelClassNames}>
                    First Name <RequiredField />
                  </label>
                  <div className="mt-2">
                    <input
                      value={data?.firstName}
                      onChange={(e) => {
                        setData((pd) => ({ ...pd, firstName: e.target.value }));
                      }}
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
                      Last Name <RequiredField />
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      value={data?.lastName}
                      onChange={(e) =>
                        setData((pd) => ({ ...pd, lastName: e.target.value }))
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
                    Date <RequiredField />
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
                    Month <RequiredField />
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
                  <label htmlFor="selectrelation" className={labelClassNames}>
                    Relationship{" "}
                  </label>
                  <div className=" mt-2">
                    <select
                      name="selectrelation"
                      className={inputClassNames}
                      onChange={(e) =>
                        setData((pd) => ({
                          ...pd,
                          relationship: e.target.value,
                        }))
                      }
                      value={data?.relationship}
                    >
                      <option value={"Others"}></option>

                      {relationshipOptions.map((item, index) => (
                        <option key={index} value={item.label}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div>
                  <div className="w-full ">
                    <label htmlFor="selectCountry" className={labelClassNames}>
                      Country Code{" "}
                    </label>
                    <div className=" mt-2">
                      <select
                        name="selectCountry"
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
                                code: codeArray ? codeArray.code : "", // Check if codeArray exists
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
                            mobno: { ...pd.mobno, mobileno: value },
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
              <FormControlLabel
                control={
                  <Switch
                    checked={data?.important}
                    onChange={(e) =>
                      setData((pd) => ({ ...pd, important: e.target.checked }))
                    }
                    name="gilad"
                  />
                }
                label="Is Important"
              />{" "}
              {/* {JSON.stringify(data)} */}
              <div className=" w-full flex gap-5 fixed bottom-0 left-0 right-0 sm:relative py-2 px-6 	sm:p-0">
                <button
                  onClick={(e) => handleLogin(e, true)}
                  // type="submit"
                  value={"Update Detail"}
                  className={formSaveClassNames}
                >
                  Update Birthday{" "}
                </button>
              </div>
            </form>

            {/* {JSON.stringify(data)} */}
          </div>
        </LoadingData>
      </div>
    </>
  );
}
export default UpdateBirthday;
