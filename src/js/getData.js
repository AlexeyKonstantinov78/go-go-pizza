import { API_URL } from './const.js';

export const getData = async (url) => {
  try {
    const response = await fetch(`${API_URL}${url}`)
    if (!response.ok) {
      throw new Error('Опс что то пошло не так');
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}