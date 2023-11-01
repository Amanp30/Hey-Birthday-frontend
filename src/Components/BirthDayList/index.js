import React, { Fragment, useContext, useEffect, useState } from "react";

import DropdownOptions from "./DropDownOPtions";
import { Link } from "react-router-dom";
import {
  deleteBirthdayEndpoint,
  getBirthdayListEndpoint,
} from "../../Services/Birthday";
import LoadingData from "../LoadingData";
import { monthsFullArray } from "../../utilities/AllArrays";
import FailedErrorMessage from "../../utilities/FailedErrorMessage";
import AppContext from "../APP/Context";

export default function BirthdayList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Notify } = useContext(AppContext);

  function bdayFetch() {
    getBirthdayListEndpoint()
      .then((response) => {
        setData(response[0].atoz);
        setLoading(false);
      })
      .catch((error) => {
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  }

  useEffect(() => {
    bdayFetch();
  }, []);

  function deleteBirthday(id) {
    deleteBirthdayEndpoint(id)
      .then((response) => {
        bdayFetch();
        Notify(response.message, "success");
      })
      .catch((error) => {
        Notify(error?.response?.data?.message, "error");
      });
  }

  console.log("the data", data);

  if (data?.length === 0 && !loading) {
    return (
      <div className="w-100 text-center  ">
        {/* <img
          src="https://unsplash-assets.imgix.net/empty-states/photos.png"
          className="w-25 "
        /> */}
        <h2 className="text-3xl">No birthdays to display first add one.</h2>
        <Link
          to={"/new"}
          className="uppercase py-2 px-6 rounded-lg bg-gray-800 text-white mt-6 inline-block"
        >
          Add first birthday
        </Link>
      </div>
    );
  }

  return (
    <LoadingData isLoading={loading}>
      <ul role="list" className="divide-y divide-gray-100">
        {data?.map((person, index) => (
          <React.Fragment key={index}>
            {/* <p className="text-3xl">{person.letter}</p> */}
            {person?.docs?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-between gap-x-6 py-5 items-center "
                >
                  <div className="min-w-0 flex-auto">
                    <p className=" font-semibold leading-6 text-gray-900 text-xl dark:text-white">
                      {item.firstName + " " + item.lastName}{" "}
                      {item.relationship ? (
                        <span className="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {item.relationship}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1   leading-5 text-gray-500 text-1.5">
                      {`Born on ${item.dob.date} ${
                        monthsFullArray[item.dob.month - 1]
                      }${item.dob.year ? ", " + item.dob.year : ""}${
                        item?.dob?.year
                          ? ", will turn " +
                            (new Date().getFullYear() - item?.dob?.year + 1)
                          : ""
                      }`}
                    </p>
                  </div>

                  <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="hidden sm:inline-block ">
                      <Link
                        to={"/update/" + item._id}
                        className="mr-10 text-[#1F2937]  font-bold dark:text-[#F5F7F8]"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBirthday(item._id)}
                        className="font-bold text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <DropdownOptions
                      id={item._id}
                      deleteFunc={deleteBirthday}
                    />
                  </div>
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </ul>
    </LoadingData>
  );
}
