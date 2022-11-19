import AbstractComponent from './abstract-component';

const createTaskListTemplate = () => (
  '<div class="board__tasks"></div>'
);

class TaskListComponent extends AbstractComponent {
  getTemplate() {
    return createTaskListTemplate();
  }
}

export default TaskListComponent;
