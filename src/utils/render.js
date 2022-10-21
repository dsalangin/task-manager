const RenederPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREBEGIN: 'beforebegin',
  BEFOREEND: 'beforeend'
};

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12 || 12);
  const minutes = castTimeFormat(date.getMinutes());
  const interval = date.getHours() > 11 ? 'PM' : 'AM';

  return `${hours}:${minutes} ${interval}`;
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenederPosition.BEFOREEND) => {
  switch (place) {
    case RenederPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenederPosition.BEFOREEND:
      container.append(element);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {formatTime, createElement, render, remove, RenederPosition};
