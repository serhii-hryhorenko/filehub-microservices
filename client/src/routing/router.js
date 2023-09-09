import {Application} from '../components/application.js';
import {Page} from '../components/pages/page.js';
import {RouterConfig} from './router-config';
import {ChangeLocationMetadataAction} from '../state-management/actions/change-location-metadata-action.js';
import {Storage} from '../rest/storage.js';
import {ChangeURLQueryParametersAction} from '../state-management/actions/change-url-query-params-action.js';

/**
 * Provides routing in FileHub application for achieving single app application conception.
 */
export class Router {
  static PAGE_IDENTIFIER_PREFIX = '#';

  #application;
  #routes;
  #defaultPageRoute;
  #homePageRoute;
  #notFoundPageCreator;

  #currentPage;
  #currentRoute;

  /**
   * @param {Application} application
   * @param {RouterConfig} config
   */
  constructor(config, application) {
    if (!config) {
      throw new Error('Router configuration has to be defined.');
    }

    this.#application = application;
    this.#routes = config.routes;
    this.#defaultPageRoute = config.defaultPageRoute;
    this.#homePageRoute = config.homePageRoute;
    this.#notFoundPageCreator = config.notFoundPageHandler;

    window.addEventListener('hashchange', () => {
      const stateManagementService = this.#application.context.stateManagementService;

      const urlQueryParameters = this.#extractUrlQueryParameters();
      const {route, metadata} = this.#extractLocation();

      if (route?.pageIdentifier && route.pageIdentifier !== this.#currentRoute?.pageIdentifier) {
        this.#currentPage?.destroy();
        this.#currentRoute = route;
        this.redirect(route.pageIdentifier);
        this.#currentPage = this.#routeTo(route);
      }

      if (!route && !metadata) {
        this.#currentPage?.destroy();
        this.#currentPage = this.#createPage(this.#notFoundPageCreator);
      }

      stateManagementService.dispatch(new ChangeLocationMetadataAction(metadata));
      stateManagementService.dispatch(new ChangeURLQueryParametersAction(urlQueryParameters));
    });

    if (Storage.authToken) {
      this.#currentRoute = this.#homePageRoute;
    } else {
      this.#currentRoute = this.#defaultPageRoute;
    }

    this.redirect(this.#currentRoute.pageIdentifier);

    if (!this.#currentPage) {
      this.#currentPage = this.#createPage(this.#currentRoute.pageCreator);
    }
  }

  /**
   * Changes URL and triggers window event to redirect to a new page.
   * @param {string} hash
   */
  redirect(hash) {
    window.location.hash = Router.PAGE_IDENTIFIER_PREFIX + hash;
  }

  /**
   * Redirects to the home page.
   */
  redirectToHomePage() {
    this.redirect(this.#homePageRoute.pageIdentifier);
  }

  /**
   * Redirects to the default/login page.
   */
  redirectToDefaultPage() {
    this.redirect(this.#defaultPageRoute.pageIdentifier);
  }

  /**
   * Adds a query parameters to the hash.
   * @param {object} parameters
   */
  addQueryParameters(parameters) {
    const query = Object.entries(parameters).reduce((queryParameters, [key, value]) => {
      return queryParameters.concat(`?${key}=${value.toString()}`);
    }, String());

    const location = this.#truncateUrlQueryParameters();

    this.redirect(location + query);
  }

  /**
   * Truncates query parameters from the hash.
   */
  removeQueryParameters() {
    this.redirect(this.#truncateUrlQueryParameters());
  }

  /**
   * @returns {string}
   */
  get #hash() {
    return window.location.hash.substring(Router.PAGE_IDENTIFIER_PREFIX.length);
  }

  /**
   * Performs routing by the hash value.
   * @param {Route} route
   * @returns {Page}
   */
  #routeTo(route) {
    if (route) {
      this.#currentRoute = route;
      return this.#createPage(route.pageCreator);
    }

    return this.#createPage(this.#notFoundPageCreator);
  }

  /**
   * Executes a page creator and changes the state of the router.
   * @param {Function} pageCreator
   * @returns {Page}
   */
  #createPage(pageCreator) {
    this.#application._render();
    return pageCreator(this.#application.pageSlot);
  }

  /**
   * @typedef Location
   * @property {Route} route
   * @property {object} [metadata]
   */

  /**
   * Extract value of a page identifier from the URL hash.
   * @returns {Location}
   * @private
   */
  #extractLocation() {
    let location = this.#truncateUrlQueryParameters();
    let metadata;

    const metadataStart = location.indexOf('/');

    if (metadataStart > -1 && metadataStart < location.length - 1) {
      metadata = location.substring(metadataStart);
      location = location.substring(0, metadataStart);
    }

    if (this.#routes.has(location)) {
      const route = this.#routes.get(location);

      const metadataValues = metadata?.split('/').slice(1);

      if (route.metadataKeys && route.metadataKeys.length === metadataValues?.length) {
        const metadata = metadataValues.reduce((metadata, value, index) => {
          metadata[route.metadataKeys[index]] = value;
          return metadata;
        }, {});

        return {route, metadata};
      }

      return {route, metadata: null};
    }

    return {route: !location ? this.#defaultPageRoute : null, metadata: null};
  }

  /**
   * @returns {object}
   * @private
   */
  #extractUrlQueryParameters() {
    const location = this.#truncateUrlQueryParameters();

    if (location.length < this.#hash.length) {
      const queryString = this.#hash.substring(location.length, this.#hash.length);
      return queryString.split('?').slice(1)
          .map((keyValueString) => keyValueString.split('='))
          .reduce((parameters, [key, value]) => {
            parameters[key] = value;
            return parameters;
          }, {});
    }

    return null;
  }

  /**
   * @returns {string}
   * @private
   */
  #truncateUrlQueryParameters() {
    const start = this.#hash.indexOf('?');
    return this.#hash.substring(0, start > -1 ? start : this.#hash.length);
  }
}
