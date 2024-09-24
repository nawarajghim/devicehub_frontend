import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UpdateProvider } from './contexts/UpdateContexts';
import Home from './views/Home';
import Layout from './views/Layout';
import Devices from './views/Devices';
import './App.css';
import Login from './components/Login';
import Data from './views/data';

// App Component
const App: React.FC = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Function to handle login
  const handleLogin = (username: string, password: string) => {
    // Simulating a login check (you would replace this with actual logic)
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  // On component mount, check if user is logged in (persisting login state)
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
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
            </Route>
            
          
            {/* Login route */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </UpdateProvider>
      </Router>
    </>
  );
};

export default App;
