import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UpdateProvider } from "./contexts/UpdateContexts";
import Home from "./views/Home";
import Layout from "./views/Layout";
import Devices from "./views/Devices";
import "./App.css";
import Login from "./views/Login";
import SingleDevice from "./components/SingleDevice";

const App = () => {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <UpdateProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/devices" element={<Devices />} />
              <Route
                path="/devices/name/:deviceName"
                element={<SingleDevice />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </UpdateProvider>
      </Router>
    </>
  );
};

export default App;
