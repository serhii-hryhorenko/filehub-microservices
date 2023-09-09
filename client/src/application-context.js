import {TitleService} from './routing/title-service.js';
import {RequestService} from './rest/request-service.js';
import {ApiService} from './rest/api-service.js';
import {StateManagementService} from './state-management/state-management-service.js';

/**
 * Context of application with configured services.
 */
export class ApplicationContext {
  #titleService;
  #requestService;
  #apiService;
  #stateManagementService;

  /**
   * Constructs a new application context.
   */
  constructor() {
    this.#titleService = new TitleService('FileHub');
    this.#requestService = new RequestService();
    this.#apiService = new ApiService(this.#requestService);
    this.#stateManagementService = new StateManagementService();
  }

  /**
   * @returns {TitleService}
   */
  get titleService() {
    return this.#titleService;
  }

  /**
   * @returns {ApiService}
   */
  get apiService() {
    return this.#apiService;
  }

  /**
   * @returns {StateManagementService}
   */
  get stateManagementService() {
    return this.#stateManagementService;
  }
}
