import axios from 'axios';

export const printResponse = response => console.log('Response: %o', response);

export const basicJsonHeader = { 'Content-Type': 'application/json' };

export const handleResponse = async (response, expected) => {
  if (response.status !== 200 && response.status !== expected) {
    console.error(`${response.status} [Peapod] Fetch Failed %o`, response);
    if (response.status === 401) {
      console.log('Need to fetch new auth token');
    }
  }
};

export const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000/api';

export const client = axios.create({
  baseURL: PEAPOD_API_URL,
  headers: basicJsonHeader
});
