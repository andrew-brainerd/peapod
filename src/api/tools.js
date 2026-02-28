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

export const parseOptions = options => {
  if (!options || Object.keys(options).length === 0) return '';
  return `?${Object.keys(options).map(key =>
    `${key}=${options[key]}`
  ).join('&')}`;
};
