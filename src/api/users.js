import { basicJsonHeader, handleResponse } from './tools';

const BASE_URL = process.env.REACT_APP_API_URL;

export const createUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ email, password })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
}
