import {MONTH_NAMES} from '../const';
import {formatTime} from '../utils/render';
import AbstractComponent from './abstract-component';

const craeteHashtagMarkup = (tags) => Array.from(tags).map((tag) => (
  `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${tag}
    </span>
  </span>`)).join('\n');

const createTaskTemplate = (task) => {
  const {description, dueDate, tags, color, repeatingDays, isArchive, isFavorite} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';
  const time = isDateShowing ? formatTime(dueDate) : '';

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? 'card--repeat' : '';
  const deadlineClass = isExpired ? 'card--deadline' : '';
  const archiveClass = isArchive ? 'card__btn--disabled' : '';
  const favoriteClass = isFavorite ? 'card__btn--disabled' : '';

  const hashtagMarkup = craeteHashtagMarkup(tags);

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${archiveClass}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${favoriteClass}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}.</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtagMarkup}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

class TaskComponent extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector('.card__btn--edit').addEventListener('click', handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector('.card__btn--archive').addEventListener('click', handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector('.card__btn--favorites').addEventListener('click', handler);
  }
}

export default TaskComponent;
