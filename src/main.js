import SiteMenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import SortComponent from './components/sort.js';
import TaskListComponent from './components/task-list';
import TaskEdit from './components/task-edit.js';
import TaskComponent from './components/task.js';
import LoadMoreButtonComponent from './components/load-more-button.js';

import {render, RenederPosition} from './utils';

import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenederPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(generateFilters()).getElement(), RenederPosition.BEFOREEND);
render(siteMainElement, new BoardComponent().getElement(), RenederPosition.BEFOREEND);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, new SortComponent().getElement(), RenederPosition.AFTERBEGIN);

const taskListComponent = new TaskListComponent();
render(boardElement, taskListComponent.getElement(), RenederPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(0, showingTasksCount).map((task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEdit(task);

  const replaceCardToForm = () => {
    taskListComponent.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = (evt) => {
    evt.preventDefault();
    taskListComponent.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent.setEditButtonClickHandler(replaceCardToForm);
  taskEditComponent.setSubmitHandler(replaceFormToCard);

  render(taskListElement, taskComponent.getElement(), RenederPosition.BEFOREEND);
});

const loadMoreButton = new LoadMoreButtonComponent();
render(boardElement, loadMoreButton.getElement(), RenederPosition.BEFOREEND);

const loadMoreButtonHandler = () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).map((task) => render(taskListElement, new TaskComponent(task).getElement(), RenederPosition.BEFOREEND));

  if (tasks.length <= showingTasksCount) {
    loadMoreButton.getElement().remove();
    loadMoreButton.removeElement();
  }
};

loadMoreButton.setClickHandler(loadMoreButtonHandler);
