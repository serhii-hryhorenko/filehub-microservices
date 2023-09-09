import {Component} from '../component';
import {TitleService} from '../../routing/title-service';

/**
 * Page to display if 404 errors occurred.
 */
export class NotFoundPage extends Component {
  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   */
  constructor(parent, titleService) {
    super(parent);
    this._init();
    titleService.setTitle('Not Found');
  }

  /**
   * @param {TitleService} titleService
   * @returns {function(HTMLElement): Page}
   */
  static creator(titleService) {
    return (slot) => new NotFoundPage(slot, titleService);
  }

  /**
   * @inheritDoc
   */
  _init() {
    this._render();
    document.body.style.background = '#3498DB';
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div class="not-found">
                <h1 class="not-found-text">:(</h1><br>
                <h2 class="not-found-text">
                    A <span>404</span> error occurred, Page not found, check the URL and try again.
                </h2>
                <br><br>
                <h3 class="not-found-text">
                    <a href="#">Return to home</a>&nbsp;|&nbsp;<a href="javascript:history.back()">Go Back</a>
                </h3>
            </div>`;
  }

  /**
   * @inheritDoc
   */
  destroy() {
    document.body.style.background = '#fff';
  }
}
