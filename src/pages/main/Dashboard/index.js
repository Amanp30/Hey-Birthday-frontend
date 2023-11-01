import { useContext, useEffect, useState } from "react";
import ordinal from "ordinal";

import AppContext from "../../../Components/APP/Context";
import HeaderSection from "../../../Components/HeaderSection";
import { getDashboardDataEndpoint } from "../../../Services/Birthday";
import LoadingData from "../../../Components/LoadingData";
import logError from "../../../utilities/LogError";
import FailedErrorMessage from "../../../utilities/FailedErrorMessage";
import { shortMonthsFullArray } from "../../../utilities/AllArrays";
import Messages from "./Messages";
import NoBirthday from "./NoBirthday";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [messageData, setMessageData] = useState([{ open: false }]);

  const wishFunction = (item) => {
    setMessageData({
      open: true,
      firstName: item.firstName,
      mobno: item.mobno,
    });
  };
  const closeWishFunction = (item) => {
    setMessageData({
      open: false,
    });
  };

  const { Notify } = useContext(AppContext);

  function bdayFetch() {
    getDashboardDataEndpoint()
      .then((response) => {
        setData(response[0]);
        setLoading(false);
      })
      .catch((error) => {
        logError(error);
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  }

  useEffect(() => {
    bdayFetch();
  }, []);

  console.log(data);

  return (
    <div className="">
      <HeaderSection text="Dashboard" />

      <Messages
        isOpen={messageData?.open}
        close={closeWishFunction}
        data={messageData}
      />
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-0 ">
        <div className="ml-0  px-2 py-2 lg:py-6 sm:px-6 lg:px-8">
          {" "}
          <LoadingData isLoading={loading}>
            {/* {JSON.stringify(data?.todaybday)} */}
            <h2 className="text-3xl font-black mb-5">Today Birthdays 🎂</h2>
            <div
              className={`mb-10 ${
                data?.todaybday?.length !== 0 ? "sm:grid" : ""
              }  lg:grid-cols-3 sm:grid-cols-2 gap-8 `}
            >
              {data?.todaybday?.length !== 0 ? (
                data?.todaybday?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-[#F3F0CA] rounded-lg p-4 relative mb-5 sm:mb-0 h-[10em] shadow-sm dark:bg-[#001524]"
                    >
                      {item?.important ? (
                        <div className="absolute top-[-.5em] left-[-.5em] text-3xl ">
                          🌟
                        </div>
                      ) : null}
                      <h3 className="text-2xl font-bold mb-2 flex items-center">
                        {item?.firstName} {item?.lastName}{" "}
                        {item.relationship ? (
                          <span className="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {item.relationship}
                          </span>
                        ) : null}
                      </h3>
                      <p>
                        Celebrating{" "}
                        {item?.dob?.year ? (
                          <>
                            {ordinal(
                              new Date().getFullYear() - item?.dob?.year + 1
                            )}
                          </>
                        ) : (
                          ""
                        )}{" "}
                        birthday today.
                      </p>

                      {item?.mobno?.mobileno && (
                        <div className="absolute bottom-0 grid grid-cols-2 left-0 right-0 py-1">
                          <a
                            className="bg-gray-800 text-white flex justify-center py-2"
                            href={`tel:${item.mobno.code}${item.mobno.mobileno}`}
                          >
                            <img src="call.svg" className="w-[25px] h-[25px]" />
                          </a>
                          <button
                            onClick={(e) => wishFunction(item)}
                            className="bg-[#1BD741]  flex justify-center py-2"
                          >
                            <img
                              src="whatsapp1.svg"
                              className="w-[25px] h-[25px]"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <NoBirthday>No birthday Today</NoBirthday>
              )}
            </div>

            <h2 className="text-3xl font-black mb-5">Upcoming Birthdays </h2>
            <div
              className={` ${
                data?.upcomingbday?.length !== 0 ? "sm:grid" : ""
              }  sm:grid-cols-2 gap-8`}
            >
              {data?.upcomingbday?.length !== 0 ? (
                data?.upcomingbday?.map((item, index) => {
                  return (
                    <div
                      className="flex gap-5 items-center mb-5 sm:mb-0 grid-flow-col shadow-sm sm:shadow dark:shadow dark:shadow-blue-50 rounded-lg"
                      key={index}
                    >
                      <div className="py-2 px-4 sm:px-5 font-bold bg-gray-800 text-white rounded-lg">
                        <p className="text-2xl"> {item.dob.date}</p>
                        <p>{shortMonthsFullArray[item.dob.month - 1]}</p>
                      </div>
                      <div>
                        <p className="text-lg sm:text-2xl font-bold flex items-center">
                          {item.firstName} {item.lastName}{" "}
                          {item.relationship ? (
                            <span className="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                              {item.relationship}
                            </span>
                          ) : null}
                        </p>
                        <p>
                          In {item.daysLeft} days{" "}
                          {item?.dob?.year ? (
                            <>
                              will turn{" "}
                              {new Date().getFullYear() - item?.dob?.year + 1}{" "}
                              year old
                            </>
                          ) : (
                            ""
                          )}
                          .
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <NoBirthday>No upcoming birthdays</NoBirthday>
              )}
            </div>
          </LoadingData>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
