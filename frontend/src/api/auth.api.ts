import axios from 'axios';

const API = 'http://localhost:3002/auth';

export const login = (email: string, password: string) => {
  return axios.post(`${API}/login`, { email, password });
};

export const register = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  return axios.post(`${API}/register`, {
    email,
    password,
    firstName,
    lastName,
  });
};

export const requestReset = (email: string) => {
  return axios.post(`${API}/request-reset`, { email });
};

export const resetPassword = (token: string, password: string) => {
  return axios.post(`${API}/reset-password`, { token, password });
};