import {
  FormControlLabel,
  Checkbox,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import { useContext, useState } from "react";
import AppContext from "../../../Components/APP/Context";
import { newListDataEndpoint } from "../../../Services/Lists";
import {
  inputClassNames,
  labelClassNames,
} from "../../../utilities/ClassNamesCollection";
import FailedErrorMessage from "../../../utilities/FailedErrorMessage";
import LoadingData from "../../../Components/LoadingData";

function SelectIDS({ data, userIDS, setUserIDS, close, isloading }) {
  const [clickNext, setClickNext] = useState(false);
  const [otherdata, setOtherdata] = useState({
    name: "",
    allowTimes: "5",
    onlynameordob: false,
  });
  const [issaving, setIssaving] = useState(false);
  const { Notify } = useContext(AppContext);

  const submitData = () => {
    try {
      if (!otherdata?.name) throw new Error("Name is required");
    } catch (error) {
      Notify(error?.message, "error");
      return;
    }

    setIssaving(true);
    const formData = new FormData();
    formData.append("ids", JSON.stringify(userIDS));
    formData.append("otherdata", JSON.stringify(otherdata));

    close(true);
    newListDataEndpoint(formData)
      .then((response) => {
        // setData(response);
        // setLoading(false);
        setUserIDS([]);
        setIssaving(false);
        setOtherdata({
          name: "",
          allowTimes: "",
          onlynameordob: false,
        });
        setClickNext(false);
        Notify(response?.message, "success");
      })
      .catch((error) => {
        Notify(error?.response?.data?.message || FailedErrorMessage, "error");
      });
  };

  const handleCheckboxChange = (event, itemId) => {
    const isChecked = event.target.checked;
    setUserIDS((prevUserIDS) => {
      if (isChecked) {
        return [...prevUserIDS, itemId];
      } else {
        return prevUserIDS.filter((id) => id !== itemId);
      }
    });
  };

  const handleParentClick = (event, itemID) => {
    const isChecked = event.target.checked;
    const filteredData = data.find((item) => item._id === itemID);
    const mappedData = filteredData?.docs?.map((item) => item?._id) || [];

    setUserIDS((prevUserIDS) => {
      if (isChecked) {
        return [...prevUserIDS, ...mappedData];
      } else {
        return prevUserIDS.filter((id) => !mappedData.includes(id));
      }
    });
  };

  return (
    <>
      {/* {JSON.stringify(userIDS)} */}

      {clickNext && (
        <NewPopUp
          issaving={issaving}
          otherdata={otherdata}
          setOtherdata={setOtherdata}
          setClickNext={setClickNext}
          submitData={submitData}
        />
      )}

      <div
        style={{ height: "calc(100% - 132px)" }}
        className=" overflow-y-scroll"
      >
        <LoadingData isLoading={isloading}>
          {data?.length > 0 ? (
            data?.map((group) => (
              <div key={group._id}>
                <div className="flex gap-8 bg-zinc-50 dark:bg-[#1e1e1e7e] dark:text-white  rounded-md px-2">
                  <FormControlLabel
                    label={group._id}
                    control={
                      <Checkbox
                        checked={group.docs.every((item) =>
                          userIDS.includes(item._id)
                        )}
                        indeterminate={
                          !group.docs.every((item) =>
                            userIDS.includes(item._id)
                          ) &&
                          group.docs.some((item) => userIDS.includes(item._id))
                        }
                        onChange={(e) => handleParentClick(e, group._id)}
                      />
                    }
                  />
                </div>
                <div>
                  {group?.docs?.map((item) => (
                    <div key={item._id} className="flex gap-8 ml-10">
                      <FormControlLabel
                        label={`${item?.firstName} ${item?.lastName}`}
                        control={
                          <Checkbox
                            checked={userIDS.includes(item._id)}
                            onChange={(e) => handleCheckboxChange(e, item._id)}
                          />
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <NoDataToShare />
          )}
        </LoadingData>
      </div>

      <div
        className={`stcky left-0 right-0 bottom-0 bg-white px-4 py-3 flex sm:flex flex-row-reverse sm:px-6 gap-8 sm:gap-0 dark:bg-black  `}
      >
        <button
          disabled={data?.length <= 0}
          type="button"
          className={`${
            data?.length > 0 ? "bg-red-600" : "bg-red-400"
          } inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto`}
          onClick={() => {
            try {
              if (userIDS.length === 0)
                throw new Error("First select profiles");
              setClickNext(true);
            } catch (error) {
              Notify(error.message, "error");
            }
          }}
        >
          Next
        </button>
        <button
          type="button"
          className={`${
            userIDS.length > 0 ? "bg-slate-200 text-slate-400" : "bg-white "
          } inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
          onClick={() => close(false)}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default SelectIDS;

export const NewPopUp = ({
  otherdata,
  setOtherdata,
  submitData,
  issaving,
  setClickNext,
}) => {
  return (
    <div className="absolute flex items-center justify-center top-0 z-30 md:h-screen right-0 bottom-0 left-0 bg-[#e8e8e844] overflow-y-auto h-auto">
      <div className="p-5 rounded-md w-[90%] sm:w-[400px] shadow-lg  bg-white text-black dark:bg-black dark:text-white  transform lg:translate-y-[-20%] overflow-y-auto max-h-[90vh] my-8 md:h-auto">
        {/* {JSON.stringify(otherdata)} */}
        <div className="w-full mb-5">
          <div className="flex items-center justify-between">
            <label htmlFor="name" className={labelClassNames}>
              Name{" "}
            </label>
            <p></p>
          </div>
          <div className="mt-2">
            <input
              value={otherdata?.name}
              onChange={(e) => {
                setOtherdata((pd) => ({
                  ...pd,
                  name: e.target.value,
                }));
              }}
              id="name"
              name="name"
              type="text"
              autoComplete="current-name"
              required
              className={inputClassNames + " min-w-[180px]"}
            />
          </div>
        </div>{" "}
        <div className="w-full mb-5">
          <div className="flex items-center justify-between">
            <label htmlFor="Nooftimes" className={labelClassNames}>
              No. of times to allow import
            </label>
            <p></p>
          </div>
          <div className="mt-2">
            <input
              value={otherdata?.allowTimes}
              onChange={(e) => {
                setOtherdata((pd) => ({
                  ...pd,
                  allowTimes: e.target.value,
                }));
              }}
              id="Nooftimes"
              name="Nooftimes"
              type="number"
              maxLength={10}
              autoComplete="current-Nooftimes"
              required
              className={inputClassNames + " min-w-[180px]"}
            />
          </div>
        </div>
        <FormControlLabel
          label="Only share Name and DOB. (If Not checked mobile no and relation also will be shared)"
          checked={otherdata?.onlynameordob}
          control={
            <Checkbox
              onChange={(e) =>
                setOtherdata((pd) => ({
                  ...pd,
                  onlynameordob: e.target.checked,
                }))
              }
            />
          }
        />
        <div
          className={`stcky left-0 right-0 bottom-0 pt-8 bg-white flex sm:flex flex-row-reverse  gap-4 sm:gap-0 dark:bg-black  `}
        >
          <button
            type="button"
            className="gap-5 flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={submitData}
          >
            {issaving && (
              <CircularProgress
                color="inherit"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            )}{" "}
            Create List
          </button>
          <button
            type="button"
            className={`  ${
              issaving ? "bg-zinc-300" : ""
            } bg-white inline-flex w-full justify-center rounded-md px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
            onClick={() => setClickNext(false)}
          >
            Cancel
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export const NoDataToShare = () => {
  return (
    <div className="w-full my-10 lg:w-[50%] mx-auto">
      Oops. No data to share first add some birthdays then you will be able to
      share data
    </div>
  );
};
