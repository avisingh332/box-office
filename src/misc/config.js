const API_BASE_URL = 'https://api.tvmaze.com';

// using async and await syntax for promises
const apiGet = async inputStr => {
  const response = await fetch(`${API_BASE_URL}${inputStr}`)
    .then(r => r.json())
    .catch(() => {});
  return response;
};
export { apiGet };
