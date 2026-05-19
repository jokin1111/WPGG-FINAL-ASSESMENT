import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get('/me');
      setUser(response.data);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    const response = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    const newToken = response.data.token;

    localStorage.setItem('token', newToken);
    setToken(newToken);

    const meResponse = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });

    setUser(meResponse.data);
  };

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const newToken = response.data.token;

    localStorage.setItem('token', newToken);
    setToken(newToken);

    const meResponse = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });

    setUser(meResponse.data);
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
    }

    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
