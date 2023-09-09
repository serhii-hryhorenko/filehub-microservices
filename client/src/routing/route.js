import {Page} from '../components/pages/page.js';

const metadataKeyPrefix = '/:';

export class Route {
  #pageIdentifier;
  #pageCreator;
  #metadataKeys;
  #isHome = false;

  /**
   * @param {string} pageIdentifier
   * @param {boolean} isHome
   * @param {function(HTMLElement): Page} pageCreator
   * @param {string} [metadataPattern] - Must start with "/" and contain metadata keys as ":metadataKey".
   */
  constructor(pageIdentifier, isHome, pageCreator, metadataPattern) {
    this.#pageIdentifier = pageIdentifier;
    this.#isHome = isHome;
    this.#pageCreator = pageCreator;

    if (metadataPattern) {
      const metadataKeys = metadataPattern.split(metadataKeyPrefix).slice(1);
      if (metadataKeys) {
        this.#metadataKeys = metadataKeys;
      } else {
        throw new Error(`Invalid metadata pattern for route: ${pageIdentifier}`);
      }
    }
  }

  /**
   * @returns {string}
   */
  get pageIdentifier() {
    return this.#pageIdentifier;
  }

  /**
   * @returns {function(HTMLElement): Page}
   */
  get pageCreator() {
    return this.#pageCreator;
  }

  /**
   * @returns {[string] | undefined}
   */
  get metadataKeys() {
    return this.#metadataKeys;
  }

  get isHome() {
    return this.#isHome;
  }
}
