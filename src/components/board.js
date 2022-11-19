import AbstractComponent from './abstract-component';

const createBoardTemplate = () => '<section class="board container"></section>';

class BoardComponent extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}

export default BoardComponent;
