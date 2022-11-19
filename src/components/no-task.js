import AbstractComponent from './abstract-component';

const createNoTaskTemplate = () => (
  `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`
);

class NoTaskComponent extends AbstractComponent {
  getTemplate() {
    return createNoTaskTemplate();
  }
}

export default NoTaskComponent;
