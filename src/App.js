import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HandleRoutes from "./Components/APP/HandleRoutes";
import AppNotification from "./Components/AppNotification";
import NavigationMenu from "./Components/TopBar/NavigationMenu";

import ErrorPage from "./pages/404";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AccountDelete from "./pages/main/AccountDelete";
import Birthdays from "./pages/main/Birthdays";
import CompleteAccount from "./pages/main/CompleteAccount";
import Dashboard from "./pages/main/Dashboard";

import NewBirthdays from "./pages/main/NewBirthday";
import UpdateBirthday from "./pages/main/UpdateBirthday";
import YourAccount from "./pages/main/YourAccount";
import Lists from "./pages/main/list";
import IndeterminateCheckbox from "./pages/main/list/Examplelist";

function App() {
  return (
    <div className="">
      <Router>
        <NavigationMenu />
        <HandleRoutes />
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/account/complete" element={<CompleteAccount />} />

          {/* Dashboard and Settings Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/your-account" element={<YourAccount />} />
          <Route path="/account/delete" element={<AccountDelete />} />
          <Route path="/birthdays" element={<Birthdays />} />
          <Route path="/new" element={<NewBirthdays />} />
          <Route path="/update/:id" element={<UpdateBirthday />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/examplelist" element={<IndeterminateCheckbox />} />

          {/* error page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <div className="h-[100px]"></div>
        <AppNotification />
      </Router>
    </div>
  );
}

export default App;
