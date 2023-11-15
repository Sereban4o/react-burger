export const getRequest = async (url, post = {}) => {
  const response = await fetch(url, post);
  const data = await response.json();
  return data;
};
