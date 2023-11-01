import HeaderSection from "../../Components/HeaderSection";
import { Link } from "react-router-dom";
import BirthdayList from "../../Components/BirthDayList";

function Birthdays() {
  return (
    <>
      <HeaderSection text={"Birthdays"} grid>
        <div className="text-right">
          <Link
            to="/new"
            className="px-6 rounded-md py-1 sm:py-2 bg-gray-800 text-white w-max float-right font-extralight"
          >
            ADD NEW
          </Link>
        </div>
      </HeaderSection>
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-0">
        <div className="ml-0  px-2 py-2 lg:py-6 sm:px-6 lg:px-8">
          <BirthdayList />
        </div>
      </div>
    </>
  );
}
export default Birthdays;
