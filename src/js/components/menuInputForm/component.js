import BaseComponent from '../baseComponent/component.js';

import { $ } from '../../utils/dom.js';
import { template } from './template.js';

class MenuInputForm extends BaseComponent {
  #handleSubmit = null;

  constructor() {
    super();
    this.#initEventHandlers();
  }

  render() {
    this.innerHTML = template;
  }

  setEvent() {
    this.on($(this, '#espresso-menu-form'), 'submit', this.#handleSubmit);
  }

  #initEventHandlers() {
    this.#handleSubmit = this.#submitInputForm.bind(this);
  }

  #submitInputForm(event) {
    event.preventDefault();
    const $input = event.target.elements['espresso-menu-name'];

    if (!this.#isEmptyInputValue($input.value.trim())) {
      alert('메뉴명을 입력해주세요.');
      return;
    }

    this.emit('addMenuItem', { inputValue: $input.value });

    $input.value = '';
  }

  #isEmptyInputValue(value) {
    return value === '' ? false : true;
  }
}

customElements.define('menu-input-form', MenuInputForm);
