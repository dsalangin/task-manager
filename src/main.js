import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButton} from './components/load-more-button.js';

import {generateTask, generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const renderElement = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

renderElement(siteHeaderElement, createMenuTemplate());
renderElement(siteMainElement, createFilterTemplate());
renderElement(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
renderElement(taskListElement, createTaskEditTemplate());

const TASK_COUNT = 3;
new Array(TASK_COUNT).fill(``).forEach(() => renderElement(taskListElement, createTaskTemplate()));

const boardElement = siteMainElement.querySelector(`.board`);
renderElement(boardElement, createLoadMoreButton());
