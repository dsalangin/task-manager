import AbstractComponent from './abstract-component';

const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  DATE_UP: 'date-up'
};

const crreateSortTemplate = () => (
  `<div class="board__filter-list">
    <a href="#" data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE UP</a>
    <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE DOWN</a>
  </div>`
);

class SortComponent extends AbstractComponent {
  getTemplate() {
    return crreateSortTemplate();
  }

  setSortTypeChengeHandler(handler) {
    this.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== 'A') {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
export default SortComponent;
