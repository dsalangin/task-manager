import AbstractComponent from './abstract-component';

const createFilterMarkup = (filter, isChecked) => {
  const {title, count} = filter;
  const checked = isChecked ? 'cheked' : '';

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked}
      disabled
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join('\n');

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

export default FilterComponent;
