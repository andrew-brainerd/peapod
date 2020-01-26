import { isEmpty, keys } from 'ramda';

export const printResponse = response => console.log('Response: %o', response);

export const basicJsonHeader = { 'Content-Type': 'application/json' };

export const handleResponse = async (response, expected) => {
  if (response.status !== 200 && response.status !== expected) {
    console.error(`${response.status} [Peapod] Fetch Failed %o`, response);
  }
};

export const parseOptions = options => {
  return (options && !isEmpty(options) &&
    `?${keys(options).map(option =>
      `${option}=${options[option]}`
    ).join('&')}`) || '';
};
