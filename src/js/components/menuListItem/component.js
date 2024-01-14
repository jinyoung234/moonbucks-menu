import BaseComponent from '../baseComponent/component.js';
import { $ } from '../../utils/dom.js';
import { template } from './template.js';

class MenuListItem extends BaseComponent {
  constructor({ content, id }) {
    super();

    this.itemDetails = { content, id };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  disconnectedCallback() {
    this.off($(this, '.menu-edit-button'), 'click', this.handleEdit);
    this.off($(this, '.menu-remove-button'), 'click', this.handleDelete);
  }

  setEvent() {
    this.on($(this, '.menu-edit-button'), 'click', this.handleEdit);
    this.on($(this, '.menu-remove-button'), 'click', this.handleDelete);
  }

  handleEdit() {
    const newMenuContent = prompt('메뉴명을 입력하세요.');
    if (newMenuContent && newMenuContent.trim() !== '') {
      this.itemDetails.content = newMenuContent;
      this.emit('editMenuItem', { ...this.itemDetails });
      this.render();
    }
  }

  handleDelete() {
    this.emit('deleteMenuItem', { id: this.itemDetails.id });
    this.remove();
  }

  render() {
    this.innerHTML = template(this.itemDetails.content);
    this.setEvent();
  }

  updateContent(newContent) {
    this.itemDetails.content = newContent;
    this.render();
  }
}

customElements.define('menu-list-item', MenuListItem);

export default MenuListItem;
