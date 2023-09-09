import {Icon} from './icon.js';

export class ErrorMessage {
  static get withIcon() {
    return (text) => Icon.error(this.create(text));
  }

  static get create() {
    return (text) => {
      const message = document.createElement('p');
      message.classList.add('error-message');
      message.innerHTML = text;
      return message;
    };
  }
}
