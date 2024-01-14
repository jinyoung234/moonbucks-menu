import BaseComponent from '../baseComponent/component.js';
import MenuListItem from '../menuListItem/component.js';

import { $ } from '../../utils/dom.js';
import { template } from './template.js';

class MenuList extends BaseComponent {
  #eventHandlers = {
    handleAddMenuList: null,
    handleFilterMenuList: null,
    handleEditMenuList: null,
    handleUpdateCategory: null,
  };

  #menus = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  #currentCategory = 'espresso';

  constructor() {
    super();
    this.#initEventHandlers();
  }

  render() {
    this.innerHTML = template;
    this.#renderMenuItems();
  }

  setEvent() {
    const menuSection = $(document, 'menu-section');
    const app = $(document, 'moonbucks-app');

    this.on(menuSection, 'addMenuItem', this.#eventHandlers.handleAddMenuList);
    this.on(app, 'categoryChange', this.#eventHandlers.handleUpdateCategory);
    this.on(this, 'deleteMenuItem', this.#eventHandlers.handleFilterMenuList);
    this.on(this, 'editMenuItem', this.#eventHandlers.handleEditMenuList);
  }

  #initEventHandlers() {
    this.#eventHandlers.handleAddMenuList = this.#addMenuList.bind(this);
    this.#eventHandlers.handleFilterMenuList = this.#filterMenuList.bind(this);
    this.#eventHandlers.handleEditMenuList = this.#editMenuList.bind(this);
    this.#eventHandlers.handleUpdateCategory = this.#updateCategory.bind(this);
  }

  #renderMenuItems() {
    const ul = $(this, '#menu-list-ul');
    ul.innerHTML = '';
    this.#menus[this.#currentCategory].forEach(({ content, id }) => {
      const menuItem = new MenuListItem({ content, id });
      ul.appendChild(menuItem);
    });
  }

  #updateCategory(e) {
    const { categoryName } = e.detail;
    this.#currentCategory = categoryName;
    this.#renderMenuItems();
  }

  #editMenuList(e) {
    const { id, content } = e.detail;
    const targetItem = this.#menus[this.#currentCategory].find((item) => item.id === id);
    targetItem.content = content;
  }

  #filterMenuList(e) {
    const idToRemove = Number(e.detail.id);
    this.#menus[this.#currentCategory] = this.#menus[this.#currentCategory].filter(
      (menu) => menu.id !== idToRemove
    );
    this.#renderMenuItems();
  }

  #addMenuList(e) {
    this.#menus[this.#currentCategory].push({
      id: Date.now(),
      content: e.detail.inputValue,
    });

    this.#renderMenuItems();
  }
}

customElements.define('menu-list', MenuList);
