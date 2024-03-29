export const textToLoverToUpperCase = name => name[0].toUpperCase() + name.slice(1).toLowerCase();

export const createElement = (tagName, attribute) => {
  const elem = document.createElement(tagName);
  Object.assign(elem, attribute);
  return elem;
};    