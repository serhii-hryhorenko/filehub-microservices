import {RouterConfig} from './router-config';
import {Route} from './route.js';
import {Page} from '../components/pages/page.js';

/**
 * Builder object for Router configuration.
 */
export class RouterConfigBuilder {
  #routes = new Map();
  #defaultPageIdentifier;
  #notFoundHandler;

  /**
   * Adds a new route to the future configuration.
   * @param {string} pageIdentifier
   * @param {function(HTMLElement): Page} pageCreator
   * @param {string} [metadataPattern]
   * @param {boolean} isHome
   * @returns {RouterConfigBuilder}
   */
  addRoute({pageIdentifier, pageCreator, metadataPattern, isHome}) {
    this.#routes.set(pageIdentifier, new Route(pageIdentifier, isHome, pageCreator, metadataPattern));
    return this;
  }

  /**
   * Sets a handler for a default page.
   * @param {string} pageIdentifier
   * @returns {RouterConfigBuilder}
   */
  setDefaultPage(pageIdentifier) {
    this.#defaultPageIdentifier = pageIdentifier;
    return this;
  }

  /**
   * Sets a handler for a not found errors page.
   * @param {Function} handler
   * @returns {RouterConfigBuilder}
   */
  setNotFoundHandler(handler) {
    this.#notFoundHandler = handler;
    return this;
  }

  /**
   * Builds a new RouterConfig instance.
   * @returns {RouterConfig}
   * @throws {Error} If specified default page is not present is routes.
   */
  build() {
    if (!this.#routes.has(this.#defaultPageIdentifier)) {
      throw new Error('Invalid default page.');
    }

    const homePageRoute = [...this.#routes.values()].find((route) => route.isHome);

    if (!homePageRoute) {
      throw new Error('No specified home page.');
    }

    return new RouterConfig(
        this.#routes,
        this.#routes.get(this.#defaultPageIdentifier),
        homePageRoute,
        this.#notFoundHandler,
    );
  }
}
