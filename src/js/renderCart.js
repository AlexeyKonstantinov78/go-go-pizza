import { cartControl } from './cartControl.js';
import { getData } from './getData.js';
import { modalController } from './modalController.js';
import { textToLoverToUpperCase } from './util.js';



const renderLi = async ({ images, name, price, cardId, size }) => {

  const li = document.createElement('li');
  li.classList.add('modal-cart__item');

  const img = document.createElement('img');
  img.classList.add('modal-cart__img');
  img.src = images[1];
  img.alt = name.ru;
  img.width = "63";
  img.height = "63";

  const divContent = document.createElement('div');
  divContent.classList.add('modal-cart__content');

  const h3Name = document.createElement('h3');
  h3Name.classList.add('modal-cart__name');
  h3Name.textContent = textToLoverToUpperCase(name.ru);

  const pInfo = document.createElement('p');
  pInfo.classList.add('modal-cart__info');

  const spanPrice = document.createElement('span');
  spanPrice.classList.add('modal-cart__price');
  spanPrice.textContent = `${price[size]} ₽`;
  const spanSlash = document.createElement('span');
  spanSlash.textContent = '/';
  const spanSize = document.createElement('span');
  spanSize.classList.add('modal-cart__size');
  spanSize.textContent = `${parseInt(size)} см`;

  pInfo.append(spanPrice, spanSlash, spanSize);

  divContent.append(h3Name, pInfo);

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('modal-cart__delete');
  btnDelete.dataset.cartId = cardId;
  btnDelete.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.4549 4.01401C11.3985 4.00992 11.3805 4.01242 11.3579 3.99904L11.3522 3.43064C11.2979 3.41032 11.2015 3.42189 11.1407 3.42189L8.70136 3.42086V4.01348L7.73452 4.01392L7.73349 3.00582C7.73333 2.72455 7.65345 2.33685 8.03552 2.29858L11.7298 2.30315C12.0624 2.30324 12.3344 2.23977 12.3353 2.69883L12.3345 4.01423L11.4549 4.01401Z" fill="#C1AB91"/>
      <path d="M15.3507 16.174C15.2392 16.6674 14.9551 17.2592 14.3936 17.3414C14.2455 17.363 14.0776 17.3491 13.9275 17.3492L6.00015 17.3485C5.65702 17.3475 5.40171 17.3159 5.14284 17.0553C4.5339 16.4421 4.61993 15.4641 4.61956 14.6723L4.61746 6.06336C4.59609 6.03136 4.48624 6.05367 4.44859 6.05367L3.77281 6.05352C3.38871 6.05317 3.35065 6.03086 3.34968 5.60977C3.34937 5.46586 3.30965 5.12292 3.37262 5.00142L3.39212 4.96339C3.43021 4.89298 3.48177 4.85839 3.55674 4.8362L16.0585 4.83686C16.2029 4.83683 16.3554 4.82702 16.4991 4.83989C16.7356 4.86105 16.7032 5.09483 16.7041 5.24905L16.7068 5.78127C16.7066 6.08752 16.4049 6.05405 16.1876 6.0542L15.4515 6.05336C15.4305 6.06827 15.4378 6.29108 15.4377 6.32805L15.4364 15.1909C15.4362 15.5305 15.4155 15.8385 15.3507 16.174ZM12.5871 8.00598L12.5891 14.863L13.9216 14.8637L13.9259 8.00652L12.9954 8.00552C12.8661 8.00536 12.7147 7.98989 12.5871 8.00598ZM6.12246 8.00611L6.12071 14.8636L7.45806 14.8637L7.45331 8.00689L6.12246 8.00611ZM9.34309 8.00598L9.34699 14.6687C9.34709 14.7314 9.34087 14.8014 9.35162 14.8628L10.6999 14.8599L10.7015 8.01195C10.6744 7.99998 10.6332 8.00592 10.6035 8.00592L9.34309 8.00598Z" fill="#C1AB91"/>
    </svg>
  `;

  li.append(img, divContent, btnDelete);

  btnDelete.addEventListener('click', () => {

    cartControl.removeCart(btnDelete.dataset.cartId);
    renderElement();
  });

  return li;
};

const renderElement = () => {
  let summ = 0;
  const cardItems = cartControl.cartData;
  console.log('cardItem: ', cardItems);
  console.log(JSON.parse(localStorage.getItem('cart')));

  const modalCartMain = document.querySelector('.modal-cart__main');
  modalCartMain.textContent = '';

  const total = document.createElement('h2');
  total.classList.add('modal-cart__title');
  total.textContent = 'Корзина';

  const ul = document.createElement('ul');
  ul.classList.add('modal-cart__list');
  //li


  const hr = document.createElement('hr');
  hr.classList.add('modal-cart__hr');

  const result = document.createElement('div');
  result.classList.add('modal-cart__result');

  const pResult = document.createElement('p');
  pResult.classList.add('modal-cart__result');
  pResult.textContent = summ + ' ₽';
  const buttonResult = document.createElement('button');
  buttonResult.classList.add('modal-cart__submit');
  buttonResult.textContent = 'Продолжить';

  result.append(pResult, buttonResult);

  const btnClose = document.createElement('button');
  btnClose.classList.add('modal__close');
  btnClose.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="currentColor"/>
      <rect x="4" y="4.60181" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60181)" fill="currentColor"/>
    </svg>
  `;

  if (cardItems.length > 0) {
    cardItems.forEach(async item => {
      const { images, name, price } = await getData(`/api/products/${item.id}`);
      summ += price[item.size];

      const data = {
        images,
        name,
        price,
        cardId: item.cardId,
        size: item.size
      }

      ul.append(await renderLi(data));
      pResult.textContent = summ + ' ₽';
    });
  } else {
    const li = document.createElement('li');
    li.classList.add('modal-cart__item');
    const p = document.createElement('p');
    p.textContent = 'Товар не выбран';
    li.append(p);
    ul.append(li);
  }

  modalCartMain.append(total, ul, hr, result, btnClose);
}

export const renderCart = () => {
  modalController({
    modal: '.modal-cart',
    btnOpen: '.header__button-cart',
    btnClose: '.modal__close',
    cbOpen(btnOpen) {
      renderElement();
    }
  });
};
