import HeadingSection from "../../Components/HeaderSection";
import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { inputClassNames } from "../../utilities/ClassNamesCollection";
import { deleteAccountEndpoint } from "../../Services/account";
import AppContext from "../../Components/APP/Context";
import SignOut from "../../utilities/Signout";
import FailedErrorMessage from "../../utilities/FailedErrorMessage";

function AccountDelete() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const cancelButtonRef = useRef(null);

  const { Notify } = useContext(AppContext);
  function deleteAccont() {
    if (data === "DELETE") {
      deleteAccountEndpoint()
        .then((response) => {
          Notify(response?.message, "success");
          setOpen(false);

          SignOut();
          window.location.href = "/auth/login";
        })
        .catch((error) => {
          Notify(error?.response?.data?.message || FailedErrorMessage, "error");
        });
    } else {
      Notify("Type DELETE in text box and then delete", "error");
    }
  }

  return (
    <>
      <HeadingSection text="Delete Account" />

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-0">
        <div className="ml-0  px-2 py-2 lg:py-6 sm:px-6 lg:px-8 text-center">
          <h1>
            When you delete your account, please be aware that all your
            information will be permanently removed from our database. This
            action is irreversible, and you won't be able to recover your
            account, birthdays, or any exported lists in the future.
          </h1>
          <button
            onClick={() => setOpen(true)}
            className=" mt-5 py-2 px-4 bg-red-600 text-white rounded-lg"
          >
            Click here to delete
          </button>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your account? All of
                            your data will be permanently removed. This action
                            cannot be undone.
                          </p>
                        </div>
                        <hr className="my-4" />
                        <div className="mt-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Type "DELETE" and click on Delete Now{" "}
                          </label>
                          <div className="mt-2">
                            <input
                              value={data}
                              onChange={(e) => setData(e.target.value)}
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className={inputClassNames}
                            />
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => deleteAccont(false)}
                    >
                      Delete Now
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
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
    </>
  );
}
export default AccountDelete;
