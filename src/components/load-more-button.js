import AbstractComponent from './abstract-component';

const createLoadMoreButton = () => '<button class="load-more" type="button">load more</button>';

class LoadMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler);
  }
}

export default LoadMoreButtonComponent;
