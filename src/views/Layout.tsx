import { Link, Outlet} from "react-router-dom";

const Layout = () => {

    return (

<>
    <div className="layout">
      <header>
        <nav className="navit">
          <ul>
          <li className="navi">
              <Link to="/">
                <img src={'../haku.svg'} alt="Home" />
              </Link>
            </li>
            <li className="navi">
              <Link to="/devices">
                <img src={'../haku.svg'} alt="Devices" />
              </Link>
            </li>
            <li className="navi">
              <Link to="/login">
                <img src={'../haku.svg'} alt="Login" />
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
