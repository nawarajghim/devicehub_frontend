import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { UpdateProvider } from "./contexts/UpdateContexts";
import Home from "./views/Home";
import Layout from "./views/Layout";
import Devices from "./views/Devices";
import "./App.css";
import Login from "./components/Login";
import Data from "./views/data";
import SingleDevice from "./components/SingleDevice";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = (username: string, password: string) => {
    // TODO: login check
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <UpdateProvider>
          <Routes>
            <Route element={<Layout />}>
              {/* Home page accessible without login */}
              <Route path="/" element={<Home />} />
              {/* Devices page accessible without login */}
              <Route path="/devices" element={<Devices />} />
              {/* Data page accessible without login */}
              <Route path="/data" element={<Data />} />
              <Route
                path="/devices/name/:deviceName"
                element={<SingleDevice />}
              />
            </Route>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </UpdateProvider>
      </Router>
    </>
  );
};

export default App;
