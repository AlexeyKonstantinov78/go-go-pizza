import { renderCart } from './renderCart.js';
import { renderPizza } from './renderPizza.js';
import { renderToppings } from './renderToppings.js';
import { toppingsToogle } from './toppingsButtom.js';

const init = () => {
  renderCart();
  toppingsToogle();
  renderPizza();
  renderToppings();
};

init();