import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthProvider';
import { Admin_Dashboard } from './Pages/Admin/Admin_Dashboard/Admin_Dashboard';
import { User_Dashboard } from './Pages/User/User_Dashboard/User_Dashboard';
import { Update_User } from './Pages/Admin/Update_User/Update_User';
import { Logout } from './Pages/Logout/Logout';

function App() {
  const { user, isAdmin } = useContext(AuthContext)
  return (
    <Routes>
      {/* {!user && (
          <> */}
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* </>
        )} */}
      {user && isAdmin && (
        <>
          <Route path='/dashboard' element={<Admin_Dashboard />} />
          <Route path='/update' element={<Update_User />} />
          <Route path='/logout' element={<Logout />} />
        </>
      )}
      {user && !isAdmin && (
        <>
          <Route path='/dashboard' element={<User_Dashboard />} />
          <Route path='/logout' element={<Logout />} />
        </>
      )}
      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
