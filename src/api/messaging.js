import { basicJsonHeader } from './auth';
import { handleResponse } from './tools';

const SIGNALWIRE_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';
const SIGNALWIRE_PROJECT_ID = process.env.REACT_APP_SIGNALWIRE_PROJECT_ID;
const SIGNALWIRE_API_KEY = process.env.REACT_APP_SIGNALWIRE_API_KEY;
const SIGNALWIRE_CREDS = `${SIGNALWIRE_PROJECT_ID}:${SIGNALWIRE_API_KEY}`;

export const getJWT = async () => {
  const response = await fetch(`${SIGNALWIRE_API_URL}/api/relay/rest/jwt `, {
    method: 'POST',
    headers: {
      ...basicJsonHeader,
      Authorization: `Basic ${base64.encode(SIGNALWIRE_CREDS)}`
    }
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};
