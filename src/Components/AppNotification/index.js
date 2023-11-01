import React, { useContext, useEffect } from "react";
import AppContext from "../APP/Context";
import { CloseButton } from "@chakra-ui/close-button";

function AppNotification() {
  const { Notification, CloseNotify } = useContext(AppContext);

  useEffect(() => {
    if (Notification.show) {
      const timer = setTimeout(() => {
        CloseNotify();
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [Notification]);

  const theTypeClasses =
    Notification.type === "success"
      ? "bg-green-600"
      : Notification.type === "error"
      ? "bg-red-600"
      : "";

  return (
    <>
      {Notification.show && (
        <div className=" w-[100%] lg:w-1/4 md:w-[60%]  sm:w-[60%] sm:top-5 transition ease-in-out fixed top-0 left-1/2 transform -translate-x-1/2 overflow-hidden z-50 dark:text-black">
          <div
            className={
              "grid grid-cols-[5fr,30px] items-start gap-5 p-4 md:rounded-lg rounded-none shadow-md  bg-white "
            }
          >
            <p className="leading-snug	font-bold">{Notification.message}</p>

            <CloseButton
              onClick={CloseNotify}
              size="md"
              className="p-1.5 rounded-lg hover:bg-slate-100"
            />
            <div
              className={
                "absolute bottom-0 left-0 right-0  h-2 sm:rounded-md rounded-none " +
                theTypeClasses
              }
            ></div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppNotification;
