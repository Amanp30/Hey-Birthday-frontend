import { useContext, useEffect, useState } from "react";
import AppContext from "../../../Components/APP/Context";
import LoadingData from "../../../Components/LoadingData";
import {
  deleteListsEndpoint,
  increaseAllowEndpoint,
  yourListsEndpoint,
} from "../../../Services/Lists";
import FailedErrorMessage from "../../../utilities/FailedErrorMessage";
import { CopyButton, ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function YourList({ loadList }) {
  const { Notify } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);

  function getLIsts() {
    yourListsEndpoint()
      .then((response) => {
        setErrorMessage("");
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  }

  function IncreaseLimit(id) {
    const input = window.prompt("Increase the number");

    if (input && !isNaN(input)) {
      const n = parseFloat(input);

      increaseAllowEndpoint(id, n)
        .then((response) => {
          getLIsts();
        })
        .catch((error) => {
          setIsLoading(false);
          Notify(error?.response?.data?.message || FailedErrorMessage, "error");
        });
    } else {
      alert("Please enter a valid number.");
    }
  }

  useEffect(() => {
    getLIsts();
  }, []);

  function deleteTHEList(id) {
    deleteListsEndpoint(id)
      .then((response) => {
        getLIsts();
        Notify(response?.message, "success");
      })
      .catch((error) => {
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  }

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <LoadingData isLoading={isLoading}>
        {errorMessage ? (
          errorMessage
        ) : (
          <div>
            <div
              style={{ gridTemplateColumns: "1fr 1fr 1fr 40px" }}
              className="dark:bg-gray-500 dark:text-white grid gap-8 font-bold bg-gray-300  py-2 sm:px-4 rounded-md"
            >
              <p>Name</p>
              <p>Allow Left </p>
              <p>Code</p>
            </div>
            {data.length > 0
              ? data?.map((item) => {
                  return (
                    <div
                      style={{ gridTemplateColumns: "1fr 1fr 1fr 40px" }}
                      className="grid gap-8 py-2 sm:px-4 rounded-md border border-b-2 border-blue-100"
                    >
                      <p>{item.name}</p>
                      <p className="flex flex-6">
                        <span> {item.allowTimes}</span>{" "}
                        <div
                          className="bg-green-500 h-fit px-2 ml-5 rounded-lg"
                          onClick={() => IncreaseLimit(item._id)}
                        >
                          Change
                        </div>
                      </p>
                      <p className="flex gap-4">
                        {item.code}{" "}
                        <CopyButton value={item.code} timeout={2000}>
                          {({ copied, copy }) => (
                            <Tooltip
                              label={copied ? "Copied" : "Copy"}
                              withArrow
                              position="right"
                            >
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                variant="subtle"
                                onClick={copy}
                              >
                                {copied ? (
                                  <IconCheck style={{ width: rem(16) }} />
                                ) : (
                                  <IconCopy style={{ width: rem(16) }} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </p>
                      <TheOptions deleteFunc={deleteTHEList} id={item._id} />
                    </div>
                  );
                })
              : "No exported list"}
          </div>
        )}
      </LoadingData>
    </div>
  );
}
export default YourList;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TheOptions({ deleteFunc, id }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="text-right">
        <Menu.Button className="p-1  hover:bg-slate-100 dark:hover:bg-[#001524] rounded-xl">
          <MoreVertIcon />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={(e) => deleteFunc(id)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
