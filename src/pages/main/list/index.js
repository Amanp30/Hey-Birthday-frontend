import React, { useState, Suspense } from "react";
import HeaderSection from "../../../Components/HeaderSection";
import ExportList from "./ExportList";
import ImportWindow from "./ImportWindow";
import YourList from "./YourList";

function Lists() {
  const [importOpen, setImportOpen] = useState(false);

  const [exportOpen, setExportOpen] = useState(false);
  const [listAgain, setListAgain] = useState(5);

  const closeImport = () => {
    setImportOpen(false);
  };
  const closeExport = () => {
    setListAgain(listAgain + listAgain);
    setExportOpen(false);
  };

  return (
    <>
      <HeaderSection text="Lists" />
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-0">
        <div className="ml-0 max-w-4xl px-2 py-2 lg:py-6 sm:px-6 lg:px-8 ">
          <ImportWindow open={importOpen} close={closeImport} />

          <ExportList
            open={exportOpen}
            close={closeExport}
            setLoadList={setListAgain}
          />

          <div className=" flex gap-8">
            <div
              className="py-2 px-8 border rounded cursor-pointer hover:bg-gray-800 hover:text-white select-none"
              onClick={() => setImportOpen(true)}
            >
              Import
            </div>
            <div
              onClick={() => setExportOpen(true)}
              className="py-2 px-8 border rounded cursor-pointer hover:bg-gray-800 hover:text-white select-none"
            >
              Export
            </div>
          </div>

          <p className="font-bold text-2xl mt-8 mb-6">
            {" "}
            Your Lists will show below
          </p>

          <YourList loadList={listAgain} />
        </div>
      </div>
    </>
  );
}
export default Lists;
