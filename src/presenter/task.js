import TaskComponent from '../components/task';
import TaskEdit from '../components/task-edit';
import {render, replace} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};


class TaskPresenter {
  _taskComponent = null;
  _taskEditComponent = null;
  _task = null;
  _mode = Mode.DEFAULT;

  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
  }

  _onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard(evt);
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  };

  _replaceCardToForm = () => {
    this._container.getElement().replaceChild(this._taskEditComponent.getElement(), this._taskComponent.getElement());
    document.addEventListener('keydown', this._onEscKeyDown);
  };

  _replaceFormToCard = (evt) => {
    evt.preventDefault();
    this._container.getElement().replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
    document.removeEventListener('keydown', this._onEscKeyDown);
  };

  _handleArchiveClick = () => {
    this._changeData({...this._task, isArchive: !this._task.isArchive});
  };

  _handleFavoriteClick = () => {
    this._changeData({...this._task, isFavorite: !this._task.isFavorite});
  };

  renderTask(task) {
    this._task = task;

    const prevTask = this._taskComponent;
    const prevTaskEdit = this._taskEditComponent;

    this._taskComponent = new TaskComponent(this._task);
    this._taskEditComponent = new TaskEdit(this._task);

    this._taskComponent.setEditButtonClickHandler(this._replaceCardToForm);
    this._taskComponent.setArchiveButtonClickHandler(this._handleArchiveClick);
    this._taskComponent.setFavoritesButtonClickHandler(this._handleFavoriteClick);
    this._taskEditComponent.setSubmitHandler(this._replaceFormToCard);

    if(prevTask === null || prevTaskEdit === null) {
      render(this._container.getElement(), this._taskComponent.getElement());
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._taskComponent.getElement(), prevTask.getElement());
    }
  }

}

export default TaskPresenter;
