import { isEmpty } from 'ramda';

export const printResponse = response => console.log('Response: %o', response);

export const handleResponse = async (response, expected) => {
  if (response.status !== 200 && response.status !== expected) {
    console.error(`${response.status} [Peapod] Fetch Failed %o`, response);
  }
};

export const parseOptions = options => {
  return (!isEmpty(options) &&
    `?${Object.keys(options).map(o =>
      `${o}=${options[o]}`
    ).join('&')}`) || '';
};
