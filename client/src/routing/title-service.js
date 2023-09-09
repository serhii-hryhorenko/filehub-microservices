/**
 * Provides page titling for FileHub application.
 */
export class TitleService {
  #applicationName;
  #delimiter;

  /**
   * @param {string} applicationName
   * @param {string} delimiter
   */
  constructor(applicationName, delimiter = '-') {
    this.#applicationName = applicationName;
    this.#delimiter = delimiter;
  }

  /**
   * Sets the title of a web page.
   * @param {string} title
   */
  setTitle(title) {
    document.title = `${this.#applicationName} ${this.#delimiter} ${title}`;
  }
}
