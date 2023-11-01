import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { birthdayWishes } from "./wishesArray";

function Messages({ isOpen, data, close }) {
  const cancelButtonRef = useRef(null);

  return (
    <>
      {isOpen ? (
        <div>
          <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={close}
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
                    <Dialog.Panel className="relative  p-5 transform overflow-hidden rounded-lg bg-white dark:bg-black dark:text-white text-left shadow-xl transition-all  lg:my-8 sm:max-w-3xl">
                      <div className="flex justify-between mb-8 ">
                        <h2 className="font-bold sm:text-2xl text-xl">
                          {" "}
                          Wishing {data?.firstName}
                        </h2>
                        <button
                          type="button"
                          className="w-[60px] h-[40px] inline-flex  justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => close(false)}
                          ref={cancelButtonRef}
                        >
                          Close
                        </button>
                      </div>

                      {birthdayWishes.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between gap-6 sm:gap-10 border-t border-gray-300 w-full mb-4 items-start"
                          >
                            <p className="py-2 ">{item}</p>
                            <a
                              target="_blank"
                              href={`https://wa.me/${data?.mobno?.code || ""}${
                                data?.mobno?.mobileno || ""
                              }/?text=${encodeURIComponent(item)}`}
                              className="text-zinc-800 font-bold mt-3 dark:text-white"
                            >
                              Send
                            </a>
                          </div>
                        );
                      })}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      ) : null}
    </>
  );
}
export default Messages;
