import SiteMenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardPresenter from './presenter/board';
import {render} from './utils/render';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const TASK_COUNT = 7;

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');

render(siteHeaderElement, new SiteMenuComponent().getElement());
render(siteMainElement, new FilterComponent(filters).getElement());

const boardPresent = new BoardPresenter(siteMainElement, tasks);
boardPresent.init();
