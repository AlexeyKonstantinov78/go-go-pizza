import { modalController } from './modalController.js';
import { modalCartController } from './renderCart.js';
import { renderPizza } from './renderPizza.js';
import { renderToppings } from './renderToppings.js';
import { toppingsToogle } from './toppingsButtom.js';

const init = () => {
  toppingsToogle();
  renderPizza();
  renderToppings();
  modalController({
    modal: '.modal-cart',
    btnOpen: '.header__button-cart',
    btnClose: '.modal__close',
    cbOpen(btnOpen) {
      modalCartController();
    }
  });
};

init();