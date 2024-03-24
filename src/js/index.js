import { renderPizza } from './renderPizza.js';
import { renderToppings } from './renderToppings.js';
import { toppingsToogle } from './toppingsButtom.js';

const init = () => {
  toppingsToogle();
  renderPizza();
  renderToppings();
};

init();