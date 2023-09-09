import {Component} from './component';
import {NotFoundPage} from './pages/not-found-page';
import {Router} from '../routing/router';
import {RouterConfig} from '../routing/router-config';
import {AuthPage} from './pages/auth-page';
import {RegistrationPage} from './pages/registration-page';
import {ApplicationContext} from '../application-context.js';
import {MainPage} from './pages/main-page.js';

/**
 * Entrypoint for FileHub application.
 */
export class Application extends Component {
  #router;
  #applicationContext;

  /**
   * @param {HTMLElement} parent
   */
  constructor(parent) {
    super(parent);
    this.#applicationContext = new ApplicationContext();
    this._init();
  }

  /**
   * @returns {HTMLElement}
   */
  get pageSlot() {
    return this.getSlot('page');
  }


  /**
   * @inheritDoc
   */
  _init() {
    this._render();

    const configuration = RouterConfig.builder()
        .addRoute({
          pageIdentifier: 'login',
          pageCreator: AuthPage.creator(
              this.#applicationContext,
              () => this.#router.redirect('registration'),
              () => this.#router.redirectToHomePage(),
          ),
        })
        .setDefaultPage('login')
        .addRoute({
          pageIdentifier: 'registration',
          pageCreator: RegistrationPage.creator(
              this.#applicationContext,
              () => this.#router.redirectToDefaultPage(),
              () => this.#router.redirectToDefaultPage(),
          ),
        })
        .addRoute({
          pageIdentifier: 'file-list',
          isHome: true,
          pageCreator: MainPage.creator(this.#applicationContext, {
            navigateToFolderHandler: (folderId) => this.#router.redirect(`file-list/${folderId}`),
            logOutHandler: () => this.#router.redirectToDefaultPage(),
            searchHandler: (value) => {
              if (value) {
                this.#router.addQueryParameters({search: value});
              } else {
                this.#router.removeQueryParameters();
              }
            },
          }),
          metadataPattern: '/:folderId',
        })
        .setNotFoundHandler(NotFoundPage.creator(this.#applicationContext.titleService))
        .build();

    this.#router = new Router(configuration, this);
  }

  /**
   * Returns application component.
   * @returns {string}
   */
  _markup() {
    return `<div id="app">
                ${this.addSlot('page')}
            </div>`;
  }

  /**
   * @returns {ApplicationContext}
   */
  get context() {
    return this.#applicationContext;
  }
}
