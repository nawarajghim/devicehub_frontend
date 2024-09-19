import { Link, Outlet} from "react-router-dom";


const Layout = () => {

    return (

<>
    <div className="layout">
      <header>
        <nav className="navit">
          <ul >
          <li className="navi">
              <Link to="/login">
              <p className="">Login</p>
              </Link>
            </li>
          <li className="navi">
              <Link to="/">
              <p className="navi-P">Home</p>
              </Link>
            </li>
            <li className="navi">
              <Link to="/devices">
              <p className="">Devices</p>
              </Link>
            </li>

          </ul>
        </nav>
      

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
