import BaseComponent from '../baseComponent/component.js';
import { template } from './template.js';
import { $ } from '../../utils/dom.js';

class MenuHeader extends BaseComponent {
  #handleClickHeaderButton = null;

  constructor() {
    super();
    this.#initEventHandlers();
  }

  render() {
    this.innerHTML = template;
  }

  setEvent() {
    this.on($(this, '#menu-header-nav'), 'click', this.#handleClickHeaderButton);
  }

  #initEventHandlers() {
    this.#handleClickHeaderButton = (event) => this.#updateCategoryName(event);
  }

  #updateCategoryName(event) {
    if (!event.target.closest('button')) return;

    const categoryName = event.target.dataset.categoryName;
    const title = event.target.textContent.trim();

    this.#updateMenuSectionTitle(title);
    this.#updateMenuInput(title);

    this.emit('categoryChange', { categoryName });
  }

  #updateMenuSectionTitle(title) {
    const menuSectionTitle = document.querySelector('moonbucks-app h2');
    menuSectionTitle.textContent = `${title} 메뉴 관리`;
  }

  #updateMenuInput(title) {
    const menuInput = document.querySelector('moonbucks-app input');
    const titleWithoutEmoji = title.slice(2);

    menuInput.placeholder = `${titleWithoutEmoji} 메뉴 이름`;
  }
}

customElements.define('menu-header', MenuHeader);
