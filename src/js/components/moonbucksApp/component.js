import BaseComponent from '../baseComponent/component.js';
import { template } from './template.js';

class MoonBucksApp extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = template;
  }
}

customElements.define('moonbucks-app', MoonBucksApp);
