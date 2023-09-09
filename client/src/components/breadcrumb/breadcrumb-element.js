import {Component} from '../component.js';
import {Link} from '../link';

/**
 * Piece of a breadcrumb that initiates the navigate action on click.
 */
export class BreadcrumbElement extends Component {
  #folder;
  #navigate;

  /**
   * @param {HTMLElement} parent
   * @param {FolderModel} folderModel
   * @param {function(string): void} onNavigate
   */
  constructor(parent, folderModel, onNavigate) {
    super(parent);
    this.#folder = folderModel;
    this.#navigate = onNavigate;
    this._init();
  }

  /**
   * @returns {function(HTMLElement, string, boolean): BreadcrumbElement}
   */
  static get homeCreator() {
    return (parent, rootFolderId, onNavigate) => new BreadcrumbElement(parent, {
      id: rootFolderId,
      name: 'Home',
    }, onNavigate);
  }

  /**
   * @returns {function(HTMLElement, string): BreadcrumbElement}
   */
  static get ellipsisCreator() {
    return (parent, currentParentId, onNavigate) => new BreadcrumbElement(parent, {
      id: currentParentId,
      name: '...',
    }, onNavigate);
  }

  /**
   * @returns {function(HTMLElement, FolderModel, function(string): void): BreadcrumbElement}
   */
  static get creator() {
    return (parent, folderModel, onNavigate) => new BreadcrumbElement(parent, folderModel, onNavigate);
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<li>${this.addSlot('folder-name')}</li>`;
  }


  /**
   * @inheritDoc
   */
  _afterRender() {
    const folderNameSlot = this.getSlot('folder-name');

    if (this.#navigate) {
      new Link(folderNameSlot, {
        text: this.#folder.name,
        onClick: () => this.#navigate?.(this.#folder.id),
      });
    } else {
      folderNameSlot.innerHTML = this.#folder.name;
    }
  }

  /**
   * @param {function(string): void} handler
   */
  set navigate(handler) {
    this.#navigate = handler;
  }
}
