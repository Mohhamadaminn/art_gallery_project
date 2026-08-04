import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => !!localStorage.getItem('access'));

  const login = async (username, password) => {
    const { data } = await api.post('auth/token/', { username, password });
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    setUser(true);
  };

  const signup = async (username, password, phoneNumber, age, email) => {
    await api.post('auth/signup/', {
      username,
      password,
      email,
      phone_number: phoneNumber,
      ...(age ? { age: Number(age) } : {}),
    });
    await login(username, password);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);