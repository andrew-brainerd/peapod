
export const printResponse = response => console.log(`Response: %o`, response);

export const handleResponse = async (response, expected) => {
  if (response.status !== 200 && response.status !== expected) {
    console.error(`${response.status} Request Failed %o`, response);
  }
}

export const basicJsonHeader = ({ 'Content-Type': 'application/json' });
