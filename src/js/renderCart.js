import { modalController } from './modalController.js';

export const renderCart = () => {
  modalController({
    modal: '.modal-cart',
    btnOpen: '.header__button-cart',
    btnClose: '.modal__close',
  });
};