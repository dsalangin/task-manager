import BoardComponent from '../components/board';
import SortComponent from '../components/sort';
import TaskListComponent from '../components/task-list';
import LoadMoreButtonComponent from '../components/load-more-button';
import TaskPresenter from './task';
import {render, remove} from '../utils/render';

class BoardPresenter {
  _boardComponent = new BoardComponent();
  _taskListComponent = new TaskListComponent();
  _loadingMoreButton = new LoadMoreButtonComponent();
  _boardTasks = [];
  _SHOWING_TASKS_COUNT_ON_START = 3;
  _SHOWING_TASKS_COUNT_BY_BUTTON = 3;
  _showingTaskCount = this._SHOWING_TASKS_COUNT_ON_START;

  constructor(container, taskModel) {
    this._boardContainer = container;
    this._taskModel = taskModel;
  }

  init() {
    this._boardTasks = [...this._taskModel];
    this._renderBoard();
  }

  _onClickLoadMoreButton() {
    const prevTasksCount = this._showingTaskCount;
    this._showingTaskCount = prevTasksCount + this._SHOWING_TASKS_COUNT_BY_BUTTON;

    this._boardTasks.slice(prevTasksCount, this._showingTaskCount).map((task) => new TaskPresenter(this._taskListComponent, this._onDataChange).renderTask(task));

    if(this._showingTaskCount > this._boardTasks.length) {
      remove(this._loadingMoreButton);
    }
  }

  _renderBoard() {
    render(this._boardContainer, this._boardComponent.getElement());
    render(this._boardComponent.getElement(), new SortComponent().getElement());
    render(this._boardComponent.getElement(), this._taskListComponent.getElement());

    this._boardTasks.slice(0, this._SHOWING_TASKS_COUNT_ON_START).map((task) => new TaskPresenter(this._taskListComponent, this._onDataChange).renderTask(task));

    render(this._boardComponent.getElement(), this._loadingMoreButton.getElement());
    this._loadingMoreButton.setClickHandler(this._onClickLoadMoreButton.bind(this));
  }

  _onDataChange() {
    console.log('board: ', this);
  }

}

export default BoardPresenter;
