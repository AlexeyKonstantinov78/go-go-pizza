import { getData } from './getData.js';
import { textToLoverToUpperCase } from './util.js';

const createTopping = (data, i, ruName) => {
  const li = document.createElement('li');
  li.classList.add('toppings__item');

  li.innerHTML = `    
    <input class="toppings__checkbox" type="checkbox" name="topping" value="${data}" id="${i + 1}">
    <label class="toppings__label" for="${i + 1}">${textToLoverToUpperCase(ruName)}</label>
  `;

  return li;
};

export const renderToppings = async () => {
  const toppingsList = document.querySelector('.toppings__list');
  const toppings = await getData('/api/toppings');
  toppingsList.textContent = '';

  const itemList = toppings.en.map((data, index) => {
    const card = createTopping(data, index, toppings.ru[index]);
    return card;
  });

  toppingsList.append(...itemList);
};