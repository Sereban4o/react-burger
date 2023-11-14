export const getRequest = async (url, post = {}) => {
  const response = await fetch(url, post);

  if (!response.ok) {
    throw new Error(`${url} вернул статус ${response.status}`);
  }

  const data = await response.json();

  return data;
};
