/*************  ✨ Codeium Command 🌟  *************/
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UpdateProvider } from "./contexts/UpdateContexts";
import Home from "./views/Home";
import Layout from "./views/Layout";
import Devices from "./views/Devices";
import "./App.css";
import Login from "./views/Login";
import NotFound from "./views/NotFound";

import Data from "./views/data";
import { UserProvider } from "./contexts/UserContext";
import NewDevices from "./views/NewDevices";

// App Component
const App: React.FC = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <UserProvider>
          <UpdateProvider>
            <Routes>
              <Route element={<Layout />}>
                {/* Home page accessible without login */}
                <Route path="/" element={<Home />} />
                {/* Devices page accessible without login */}
                <Route path="/devices" element={<Devices />} />
                {/* Data page accessible without login */}
                <Route path="/devices/name/:deviceName" element={<Data />} />
                <Route path="/detected-new-devices" element={<NewDevices />} />
              </Route>
              <Route path="/login" element={<Login />} />
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UpdateProvider>
        </UserProvider>
      </Router>
    </>
  );
};

export default App;

/******  f2160912-a5b6-43e9-ab6b-bdd29e51bd8d  *******/
