export const cartControl = {
  cartData: JSON.parse(localStorage.getItem('cart') || '[]'),
  addCart(product) {
    this.cartData.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  },
  removeCart(cardId = 0) {
    // ! метод удаления товара из корзины

    const data = this.cartData.filter(item => item.cardId !== cardId);
    localStorage.setItem('cart', JSON.stringify(data));
  }
};