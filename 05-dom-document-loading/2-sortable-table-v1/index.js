export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.createElement();
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.classList.add('sortable-table');

    this.subElements = {};

    this.createElementHeader();
    this.createElementBody();
  }

  createElementHeader() {
    const header = document.createElement('div');
    header.classList.add('sortable-table__header');
    header.innerHTML = this.headerConfig.map(item => this.getHeaderCell(item)).join('');

    this.element.append(header);
    this.subElements.header = header;
  }

  createElementBody() {
    const body = document.createElement('div');
    body.classList.add('sortable-table__body');
    body.innerHTML = this.data.map(item => this.getBodyRow(item)).join('');

    this.element.append(body);
    this.subElements.body = body;
  }

  getHeaderCell(item) {
    const { id, title, sortable, sortType } = item;
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-sort-type="${sortType}">
        <span>${title}</span>
        ${sortable ? this.getSortingArrow() : ''}
      </div>
    `;
  }

  getSortingArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

  getBodyRow(item) {
    return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.headerConfig.map(({ id }) => `<div class="sortable-table__cell">${item[id]}</div>`).join('')}
      </a>
    `;
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = sortedData.map(item => this.getBodyRow(item)).join('');
  }

  // sortData(field, order) {
  //   const sortType = this.headerConfig.find(item => item.id === field).sortType;
  //   const direction = order === 'asc' ? 1 : -1;

  //   return [...this.data].sort((a, b) => {
  //     switch (sortType) {
  //     case 'number':
  //       return direction * (a[field] - b[field]);
  //     case 'string':
  //       return direction * a[field].localeCompare(b[field], ['ru-RU-u-kf-upper', 'en-US-u-kf-upper']);
  //     default:
  //       return 0;
  //     }
  //   });
  // }
  sortData(field, order) {
    const sortType = this.headerConfig.find(item => item.id === field).sortType;

    return this.data.sort((a, b) => {
      if (sortType === "string") {
        return order === "asc" 
          ? a[field].localeCompare(b[field], ["ru-RU-u-kf-upper", "en-US-u-kf-upper"])
          : b[field].localeCompare(a[field], ["ru-RU-u-kf-upper", "en-US-u-kf-upper"]);
      } else {
        return order === "asc" ? a[field] - b[field] : b[field] - a[field];
      }
    });
  }

  destroy() {
    this.element.remove();
  }  
}

