import { getData } from './getData.js';
import { textToLoverToUpperCase } from './util.js';

const btnReset = document.createElement('button');
btnReset.classList.add('pizza__reset-toppings');
btnReset.textContent = 'Сбросить фильтр';
btnReset.type = 'reset';
btnReset.setAttribute('form', 'toppings');

const createCard = data => {
  const card = document.createElement('article');
  card.classList.add('card', 'pizza__card');

  card.innerHTML = `
    <picture>
      <source srcset="${data.images[1]}" type="image/webp">
      <img class="card__image" src="${data.images[0]}" alt="${data.name.ru}">
    </picture>
    <div class="card__content">
        <h3 class="card__title">${textToLoverToUpperCase(data.name.ru)}</h3>
        <p class="card__info"><span class="card__price">${data.price['25cm']} &#x20bd;</span><span>/</span><span class="card__weight">25 см</span></p>
        <button class="card__button" data-id="${data.id}">Выбрать</button>
    </div>
  `;

  return card;
};

export const renderPizza = async (toppings) => {

  const pizzas = await getData(`/api/products${toppings ? `?toppings=${toppings}` : ''}`);
  const pizzaTitle = document.querySelector('.pizza__title');
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = '';

  if (pizzas.length) {
    pizzaTitle.textContent = 'Пицца';
    btnReset.remove();
    const itemList = pizzas.map((data) => {
      const item = document.createElement('li');
      item.classList.add('pizza__item');
      const card = createCard(data);
      item.append(card);
      return item;
    });

    pizzaList.append(...itemList);
  } else {
    pizzaTitle.textContent = 'Такой пиццы у нас нет :(';
    pizzaTitle.after(btnReset);
  }
};

btnReset.addEventListener('click', () => {
  renderPizza();
  document.querySelector('.toppings__item_reset').remove();
});