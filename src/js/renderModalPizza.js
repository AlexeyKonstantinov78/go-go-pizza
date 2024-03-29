import { getData } from './getData.js';
import { createElement, textToLoverToUpperCase } from './util.js';

const renderELement = (data) => {
  const modalPizzaMain = document.querySelector('.modal-pizza__main');
  modalPizzaMain.textContent = '';

  modalPizzaMain.innerHTML = `
    <img class="modal-pizza__img" width="180" height="180" src="${data.images[1]}" alt="${data.name.ru}">
    <h2 class="modal-pizza__title">${textToLoverToUpperCase(data.name.ru)}</h2>
    <p class="modal-pizza__toppings">${data.toppings.ru}</p>
    <p class="modal-pizza__info"><span class="modal-pizza__price">${data.price['25cm']} &#x20bd;</span><span>/</span><span class="modal-pizza__size">25 см</span></p>
    <form class="modal-pizza__form">
        <div class="modal-pizza__group-fieldset">
            <fieldset class="modal-pizza__fieldset">
                <input class="modal-pizza__radio" type="radio" id="thick" name="crust" value="thick">
                <label class="modal-pizza__label" for="thick">Пышное тесто</label>
                <input class="modal-pizza__radio" type="radio" id="thin" name="crust" value="thin" checked>
                <label class="modal-pizza__label" for="thin">Тонкое тесто</label>
            </fieldset>
            <fieldset class="modal-pizza__fieldset">
                <input class="modal-pizza__radio" type="radio" id="25см" name="size" value="25см" checked>
                <label class="modal-pizza__label" for="25см">25 см</label>
                <input class="modal-pizza__radio" type="radio" id="30см" name="size" value="30см">
                <label class="modal-pizza__label" for="30см">30 см</label>
                <input class="modal-pizza__radio" type="radio" id="35см" name="size" value="35см">
                <label class="modal-pizza__label" for="35см">35 см</label>
            </fieldset>
        </div>
        <button class="modal-pizza__add-cart" data-id="${data.id}">В корзину</button>
    </form>
    <button class="modal__close"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="currentColor" />
            <rect x="4" y="4.60181" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60181)" fill="currentColor" />
        </svg>
    </button>
  `;
}

export const renderModalPizza = async (id) => {
  console.log('id: ', id);
  const dataIdPizza = await getData(`/api/products/${id}`);
  console.log('dataIdPizza: ', dataIdPizza);
  if (dataIdPizza) {
    renderELement(dataIdPizza);
  }
};