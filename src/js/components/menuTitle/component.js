import BaseComponent from '../baseComponent/component.js';

import { template } from './template.js';

class MenuTitle extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = template;
  }
}

customElements.define('menu-title', MenuTitle);
