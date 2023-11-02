import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import AppContext from "../../../Components/APP/Context";
import { getListDataEndpoint } from "../../../Services/Lists";
import FailedErrorMessage from "../../../utilities/FailedErrorMessage";
import SelectIDS from "./SelectIDS";

export default function ExportList({ open, close }) {
  const cancelButtonRef = useRef(null);

  const [data, setData] = useState([]);

  const [userIDS, setUserIDS] = useState([]);
  const [isloading, setIsloading] = useState(true);

  const { Notify } = useContext(AppContext);

  useEffect(() => {
    if (open)
      getListDataEndpoint()
        .then((response) => {
          setData(response);
          setIsloading(false);
        })
        .catch((error) => {
          Notify(error?.response?.data?.message || FailedErrorMessage, "error");
        });

    return () => {};
  }, [open]);

  const DontCLose = (forceClose) => {
    console.log({ forceClose });
    if (forceClose) {
      close();
      window.location.href = window.location.href;
    }
    if (userIDS.length > 0) return;

    close();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={DontCLose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0  z-10 w-screen overflow-y-auto">
          <div className="flex sm:minmax-h-full  sm:my-8 items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative  w-[400px] bg-white px-5 py-0 transform overflow-hidden  rounded-lg h-[95vh] sm:h-[85vh]  dark:bg-black dark:text-white text-left shadow-xl transition-all  lg:my-8 sm:max-w-7xl  sm:w-full`}
              >
                <div className="sticky bg-white z-20 top-0 left-0 right-0 dark:bg-black dark:text-white">
                  <h2 className="mb-2 font-bold sm:text-2xl text-xl ">
                    Export
                  </h2>
                </div>
                <p className="text-red-500 mb-2">Select names to share</p>

                <SelectIDS
                  close={DontCLose}
                  data={data}
                  isloading={isloading}
                  userIDS={userIDS}
                  setUserIDS={setUserIDS}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
