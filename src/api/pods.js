import { handleResponse } from './tools';

const basicJsonHeader = { 'Content-Type': 'application/json' };

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const createPod = async name => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
}
