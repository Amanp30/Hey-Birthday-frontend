function NoBirthday({ children }) {
  return (
    <div className="h-40">
      <h1 className="text-center font-bold ">
        {children ? children : `No  birthdays!`}
      </h1>
    </div>
  );
}
export default NoBirthday;
