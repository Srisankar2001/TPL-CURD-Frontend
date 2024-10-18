import React, { createContext, useState, useEffect } from 'react';
import { decode, isTokenExpired, refreshAccessToken } from '../Api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const accessTokenExpireAt = localStorage.getItem('accessTokenExpireAt');
      const refreshToken = localStorage.getItem('refreshToken');
      const refreshTokenExpireAt = localStorage.getItem('refreshTokenExpireAt');

      const isLoginOrRegisterPage = location.pathname === '/' || location.pathname === '/register';

      if (refreshToken && refreshTokenExpireAt && accessToken && accessTokenExpireAt) {
        if (!isTokenExpired(refreshToken)) {
          if (!isTokenExpired(accessToken)) {
            if (!user) {
              await decode(setUser, setIsAdmin);
            }
          } else {
            await refreshAccessToken(user, setUser, setIsAdmin);
          }
        } else {
          if (!isLoginOrRegisterPage) {
            localStorage.clear();
            navigate("/");
          }
        }
      } else {
        if (!isLoginOrRegisterPage) {
          localStorage.clear();
          navigate("/");
        }
      }
    };

    checkToken();
  }, [navigate, user, location]);


  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
