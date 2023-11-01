function HeaderSection({ text, children, grid }) {
  return (
    <div className="bg-zinc-100 dark:bg-[#001524] ">
      <div
        className={`mx-auto max-w-7xl px-2 py-2 lg:py-6 sm:px-6 lg:px-8 ${
          grid ? "grid grid-cols-2" : ""
        } items-center`}
      >
        <h1 className="  text-2xl font-bold  ">{text}</h1>
        {children}
      </div>
    </div>
  );
}

export default HeaderSection;
