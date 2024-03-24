import { API_URL, textToLoverToUpperCase } from './const.js';

const fetchToppings = async () => {
  try {
    const response = await fetch(`${API_URL}/api/toppings`)
    if (!response.ok) {
      throw new Error('Опс что то пошло не так');
    }
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

const createTopping = (data, i) => {
  const li = document.createElement('li');
  li.classList.add('toppings__item');

  li.innerHTML = `    
    <input class="toppings__checkbox" type="checkbox" name="topping" value="${data}" id="${i + 1}">
    <label class="toppings__label" for="${i + 1}">${textToLoverToUpperCase(data)}</label>
  `;

  return li;
};

export const renderToppings = async () => {
  const toppingsList = document.querySelector('.toppings__list');
  const toppings = await fetchToppings();
  toppingsList.textContent = '';

  const itemList = toppings.ru.map((data, index) => {
    const card = createTopping(data, index);
    return card;
  });

  toppingsList.append(...itemList);

};