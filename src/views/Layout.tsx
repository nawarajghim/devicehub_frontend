import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const [navbarPosition, setNavbarPosition] = useState("home");

  // Update navbar position based on the current route
  useEffect(() => {
    if (location.pathname === "/devices") {
      setNavbarPosition("devices");
    } else if (location.pathname === "/") {
      setNavbarPosition("home");
    } else if (location.pathname === "/login") {
      setNavbarPosition("login");
    }
  }, [location.pathname]);

  return (
    <>
      <div className="layout">
        <header>
          <nav className="navit">
            <ul>
              <li className="navi">
                <Link to="/login">
                  <p className="">
                    {/* Admin Login Icon */}
                    Admin Login
                  </p>
                </Link>
              </li>
              <li className="navi">
                <Link to="/">
                  <p className={location.pathname === "/" ? "navi-p-active" : ""}>
                    {/* Home Icon */}
                    Home
                  </p>
                </Link>
              </li>
              <li className="navi">
                <Link to="/devices">
                  <p className={location.pathname === "/devices" ? "navi-p-active" : ""}>
                    {/* Devices Icon */}
                    Devices
                  </p>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Dynamically position the navbar */}
          <div className={`navbar ${navbarPosition}`}></div>
        </header>
        <main className="mainpage">
          <Outlet />
        </main>
      </div>
      <footer className="footer">
        <p>Device hub © 2024</p>
      </footer>
    </>
  );
};

export default Layout;
