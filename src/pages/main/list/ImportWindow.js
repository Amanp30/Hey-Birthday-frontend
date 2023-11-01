import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
  inputClassNames,
  labelClassNames,
} from "../../../utilities/ClassNamesCollection";
import RequiredField from "../../../Components/RequiredFields";
import CircularProgress from "@mui/material/CircularProgress";
import { importListEndpoint } from "../../../Services/Lists";
import FailedErrorMessage from "../../../utilities/FailedErrorMessage";
import AppContext from "../../../Components/APP/Context";

export default function ImportWindow({ open, close }) {
  const cancelButtonRef = useRef(null);

  const [code, setCode] = useState("");
  const { Notify } = useContext(AppContext);

  const [isImporting, setIsImporting] = useState(false);

  function submitData() {
    setIsImporting(true);
    importListEndpoint(code)
      .then((response) => {
        Notify(response?.message, "success");
        setIsImporting(false);
        close(true);
      })
      .catch((error) => {
        setIsImporting(false);
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  }

  const DontCLose = () => {
    if (isImporting) return;
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
          <div className="flex sm:minmax-h-full sm:my-8 items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-[400px] p-5 transform overflow-hidden rounded-lg bg-white dark:bg-black dark:text-white text-left shadow-xl transition-all  lg:my-8 sm:max-w-3xl  sm:w-[500px]">
                <h2 className="mb-5 font-bold sm:text-2xl text-xl">
                  Import List
                </h2>

                <p className="mb-5">List code is shared by your friend.</p>

                <div className="w-full">
                  <label htmlFor="firstName" className={labelClassNames}>
                    List Code <RequiredField />
                  </label>
                  <div className="mt-2">
                    <input
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter secret list code"
                      autoComplete="firstName"
                      required
                      className={inputClassNames}
                    />
                  </div>
                </div>

                <div className=" pt-8 sm:flex sm:flex-row-reverse ">
                  <button
                    disabled={isImporting}
                    type="button"
                    className={`items-center gap-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto ${
                      isImporting ? "bg-red-300" : ""
                    }`}
                    onClick={submitData}
                  >
                    {isImporting && (
                      <CircularProgress
                        color="inherit"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    )}
                    Import
                  </button>
                  <button
                    disabled={isImporting}
                    type="button"
                    className={` ${
                      isImporting ? "bg-zinc-300" : ""
                    } mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                    onClick={DontCLose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
