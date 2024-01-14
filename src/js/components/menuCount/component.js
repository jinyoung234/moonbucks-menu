import BaseComponent from '../baseComponent/component.js';

import { $ } from '../../utils/dom.js';
import { template } from './template.js';

class MenuCount extends BaseComponent {
  #menuItemCount = 0;

  #handleUpdateMenuCount = null;

  constructor() {
    super();
    this.#initEventHandlers();
  }

  render() {
    this.innerHTML = template(this.#menuItemCount);
  }

  setEvent() {
    const menuSection = $(document, 'menu-section');
    menuSection.addEventListener('addMenuItem', this.#handleUpdateMenuCount);
    menuSection.addEventListener('deleteMenuItem', this.#handleUpdateMenuCount);

    $(document, 'moonbucks-app').addEventListener('categoryChange', this.#handleUpdateMenuCount);
  }

  #initEventHandlers() {
    this.#handleUpdateMenuCount = () => this.#updateMenuCount();
  }

  #updateMenuCount() {
    const menuListUl = document.querySelector('#menu-list-ul');
    this.#menuItemCount = menuListUl.childElementCount;
    this.render();
  }
}

customElements.define('menu-count', MenuCount);
