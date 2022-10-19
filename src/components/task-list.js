import AbstractComponent from "./abstract-component";

const createTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

class TaskListComponent extends AbstractComponent {
  getTemplate() {
    return createTaskListTemplate();
  }
}

export default TaskListComponent;
