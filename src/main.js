import SiteMenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import SortComponent from './components/sort.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButton} from './components/load-more-button.js';

import {render, RenederPosition} from './utils';

import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderElement = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), RenederPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(generateFilters()).getElement(), RenederPosition.BEFOREEND);
render(siteMainElement, new BoardComponent().getElement(), RenederPosition.BEFOREEND);

const boardElement = siteMainElement.querySelector(`.board`);

render(boardElement, new SortComponent().getElement(), RenederPosition.AFTERBEGIN);

const tasks = generateTasks(TASK_COUNT);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
renderElement(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).map((task) => renderElement(taskListElement, createTaskTemplate(task)));

renderElement(boardElement, createLoadMoreButton());

const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).map((task) => renderElement(taskListElement, createTaskTemplate(task)));

  if (tasks.length <= showingTasksCount) {
    loadMoreButton.remove();
  }
});
