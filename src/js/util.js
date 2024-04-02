export const textToLoverToUpperCase = name => name[0].toUpperCase() + name.slice(1).toLowerCase();

export const createElement = (tagName, attribute) => {
  const elem = document.createElement(tagName);
  Object.assign(elem, attribute);
  return elem;
};

export const createRadioInput = (className1, id, name, value) => {
  const input = document.createElement('input');
  input.type = 'radio';
  input.classList.add(className1);
  input.id = id;
  input.name = name;
  input.value = value;
  return input;
};

export const createLabel = (className, forId, labelText) => {
  const label = document.createElement('label');
  label.classList.add(className);
  label.htmlFor = forId;
  label.textContent = labelText;
  return label;
};