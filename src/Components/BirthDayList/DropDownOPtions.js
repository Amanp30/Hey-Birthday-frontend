import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { Link } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropdownOptions({ id, deleteFunc }) {
  return (
    <Menu as="div" className="sm:hidden relative inline-block text-left">
      <div>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/update/${id}`}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Edit
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => deleteFunc(id)}
                  href="#"
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
