const API_BASE_URL = 'https://api.tvmaze.com';

const apiGet = async inputStr => {
  const response = await fetch(`${API_BASE_URL}${inputStr}`).then(r =>
    r.json()
  );
  return response;
};
export { apiGet };
