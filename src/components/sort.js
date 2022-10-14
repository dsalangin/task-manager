import AbstractComponent from "./abstract-component";

const crreateSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

class SortComponent extends AbstractComponent {
  getTemplate() {
    return crreateSortTemplate();
  }
}
export default SortComponent;
