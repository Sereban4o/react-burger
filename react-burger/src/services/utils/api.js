export const getRequest = async (url, post = {}) => {
  const response = await fetch(url, post);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};
