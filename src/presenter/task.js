import TaskComponent from '../components/task';
import TaskEdit from '../components/task-edit';
import {render} from '../utils/render';

class TaskPresenter {
  _taskComponent = null;
  _taskEditComponent = null;

  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
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

  renderTask(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEdit(task);

    this._taskComponent.setEditButtonClickHandler(this._replaceCardToForm);
    this._taskComponent.setArchiveButtonClickHandler(this._onDataChange);
    this._taskComponent.setFavoritesButtonClickHandler(this._onDataChange);
    this._taskEditComponent.setSubmitHandler(this._replaceFormToCard);

    render(this._container.getElement(), this._taskComponent.getElement());
  }
}

export default TaskPresenter;
