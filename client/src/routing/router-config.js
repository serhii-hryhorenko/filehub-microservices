import {RouterConfigBuilder} from './router-config-builder';
import {Page} from '../components/pages/page.js';
import {Route} from './route.js';

/**
 * Router configuration that consists of routes and handlers for them.
 */
export class RouterConfig {
  #routes;
  #defaultPageRoute;
  #homePageRoute;
  #notFoundPageHandler;

  /**
   * @param {Map<string, function(HTMLElement): Page>} routes
   * @param {Route} defaultPageRoute
   * @param {Route} homePageRoute
   * @param {function(): Page} notFoundPageHandler
   */
  constructor(routes, defaultPageRoute, homePageRoute, notFoundPageHandler) {
    if (!routes || !routes.size) {
      throw new Error('Routes must be defined for the router configuration.');
    }

    this.#routes = routes;
    this.#defaultPageRoute = defaultPageRoute;
    this.#homePageRoute = homePageRoute;
    this.#notFoundPageHandler = notFoundPageHandler;
  }

  /**
   * Constructs a new builder instance for itself.
   * @returns {RouterConfigBuilder}
   */
  static builder() {
    return new RouterConfigBuilder();
  }

  /**
   * @returns {Map<string, Route>}
   */
  get routes() {
    return this.#routes;
  }

  /**
   * @returns {Route}
   */
  get defaultPageRoute() {
    return this.#defaultPageRoute;
  }

  /**
   * @returns {function(): Page}
   */
  get notFoundPageHandler() {
    return this.#notFoundPageHandler;
  }

  /**
   * @returns {Route}
   */
  get homePageRoute() {
    return this.#homePageRoute;
  }
}
