import { getLocalAccessToken } from '../utils/spotify';

export const printResponse = (response: Response): void => console.log('Response: %o', response);

export const basicJsonHeader = { 'Content-Type': 'application/json' };

export const authHeaders = (): Record<string, string> => {
  const token = getLocalAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const handleResponse = (response: Response, expected?: number): void => {
  if (response.status !== 200 && response.status !== expected) {
    console.error(`${response.status} [Peapod] Fetch Failed %o`, response);
    if (response.status === 401) {
      console.log('Need to fetch new auth token');
    }
    throw new Error(`Request failed with status ${response.status}`);
  }
};

export const parseOptions = (options?: Record<string, string | number>): string => {
  if (!options || Object.keys(options).length === 0) return '';
  return `?${Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&')}`;
};
