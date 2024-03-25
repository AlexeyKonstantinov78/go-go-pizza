import { getData } from './getData.js';
import { renderPizza } from './renderPizza.js';
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

  const itemReset = document.createElement('li');
  itemReset.classList.add('toppings__item');
  const btnReset = document.createElement('button');
  btnReset.classList.add('toppings__reset');
  btnReset.textContent = 'Сбросить';
  btnReset.type = "reset";
  itemReset.append(btnReset);

  const toppingsForm = document.querySelector('.toppings__form');

  toppingsForm.addEventListener('change', (event) => {
    const formData = new FormData(toppingsForm);
    const checkToppings = [];

    //просмотр данных в форм дата
    // console.log(Object.fromEntries(formData));

    // formData.entries().forEach(entry => console.log(entry));

    // for (const item of formData.entries()) {
    //   console.log(item);
    // }
    // for (const [name, value] of formData.entries()) {
    //   console.log(name);
    //   console.log(value);
    // }
    for (const [, value] of formData.entries()) {
      checkToppings.push(value);
    }

    renderPizza(checkToppings);

    if (checkToppings.length) {
      toppingsList.append(itemReset);
    }
  });

  itemReset.addEventListener('click', () => {
    renderPizza();
    itemReset.remove();
    toppingsForm.reset();
  });
};


