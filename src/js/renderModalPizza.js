import { cartControl } from './cartControl.js';
import { getData } from './getData.js';
import { createLabel, createRadioInput, textToLoverToUpperCase } from './util.js';

const renderELement = ({ id, images, name, price, toppings }) => {
  const modalPizzaMain = document.querySelector('.modal-pizza__main');
  modalPizzaMain.textContent = '';

  let size = Object.keys(price)[0];

  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = images[1];
  source.type = 'image/webp';

  const img = document.createElement('img');
  img.classList.add('modal-pizza__img');
  img.src = images[0];
  img.alt = name.ru;
  img.width = "180";
  img.height = "180";
  picture.append(source, img);

  const title = document.createElement('h2');
  title.classList.add('modal-pizza__title');
  title.textContent = textToLoverToUpperCase(name.ru);

  const toppingsElement = document.createElement('p');
  toppingsElement.classList.add('modal-pizza__toppings');
  toppingsElement.textContent = textToLoverToUpperCase(toppings.ru);

  const priceSizeInfo = document.createElement('p');
  priceSizeInfo.classList.add('modal-pizza__info');

  const priceElement = document.createElement('span');
  priceElement.classList.add('modal-pizza__price');

  const slashElement = document.createElement('span');
  slashElement.textContent = '/';

  const sizeElement = document.createElement('span');
  sizeElement.classList.add('modal-pizza__size');

  priceSizeInfo.append(priceElement, slashElement, sizeElement);

  const updatePrice = () => {
    const selectedSizeInput = form.querySelector('input[name="size"]:checked');
    size = selectedSizeInput.value;
    priceElement.textContent = `${price[size]} ₽`;
    sizeElement.textContent = `${parseInt(size)} cm`;
  };

  const form = document.createElement('form');
  form.classList.add('modal-pizza__form');
  form.id = id;

  const groupFieldset = document.createElement('div');
  groupFieldset.classList.add('modal-pizza__group-fieldset');

  const fieldsetCrust = document.createElement('fieldset');
  fieldsetCrust.classList.add('modal-pizza__fieldset');

  const thickInput = createRadioInput('modal-pizza__radio', 'thick', 'crust', 'thick');
  const thickLabel = createLabel('modal-pizza__label', 'thick', 'Пышное тесто');

  const thinInput = createRadioInput('modal-pizza__radio', 'thin', 'crust', 'thin');
  const thinLabel = createLabel('modal-pizza__label', 'thin', 'Тонкое тесто');
  thickInput.checked = true;
  fieldsetCrust.append(thickInput, thickLabel, thinInput, thinLabel);

  const fieldsetSize = document.createElement('fieldset');
  fieldsetSize.classList.add('modal-pizza__fieldset');

  const sizeInputs = Object.keys(price).map(size => createRadioInput('modal-pizza__radio', size, 'size', size));
  sizeInputs[0].checked = true;

  sizeInputs.forEach(input => {
    const label = createLabel('modal-pizza__label', input.id, `${parseInt(input.value)} cm`);
    input.addEventListener('change', updatePrice);
    fieldsetSize.append(input, label);
  });

  groupFieldset.append(fieldsetCrust, fieldsetSize);

  const addToCartBtn = document.createElement('button');
  addToCartBtn.classList.add('modal-pizza__add-cart');
  addToCartBtn.dataset.id = id;
  addToCartBtn.textContent = 'В корзину';
  form.append(groupFieldset, addToCartBtn);

  const btnClose = document.createElement('button');
  btnClose.classList.add('modal__close');
  btnClose.innerHTML = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="currentColor" />
    <rect x="4" y="4.60181" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60181)" fill="currentColor" />
  </svg>
  `;

  modalPizzaMain.append(picture, title, toppingsElement, priceSizeInfo, form, btnClose);

  updatePrice();

  let timerId = null;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const product = {
      cardId: crypto.randomUUID(),
      id,
      crust: formData.get('crust'),
      size: formData.get('size'),
    }

    console.log('product: ', product);

    cartControl.addCart(product);

    addToCartBtn.disabled = true;
    addToCartBtn.textContent = 'Добавлено';
    timerId = setTimeout(() => {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = 'В корзину';
    }, 3000);
  });

  form.addEventListener('change', () => {
    clearTimeout(timerId);
    addToCartBtn.disabled = false;
    addToCartBtn.textContent = 'В корзину';
  });
}

export const renderModalPizza = async (id) => {
  const dataIdPizza = await getData(`/api/products/${id}`);
  if (dataIdPizza) {
    renderELement(dataIdPizza);
  }
};