import {RequestService} from './request-service';
import {Response} from './response.js';
import {Storage} from './storage.js';

/**
 * @typedef {object} Credentials
 * @property {string} email
 * @property {string} password
 */

/**
 * Perform API requests to perform application actions.
 */
export class ApiService {
  #requestService;

  /**
   * @param {RequestService} requestService
   */
  constructor(requestService) {
    this.#requestService = requestService;
  }

  /**
   * Performs a POST request to authenticate the user.
   * @param {Credentials} credentials
   * @returns {string}
   */
  async login(credentials) {
    const response = await this.#requestService.post('/api/authenticate', {body: credentials});

    const {token} = {...response.body};
    Storage.authToken = token;

    return response;
  }

  /**
   * Performs a POST request to register the user.
   * @param {Credentials} credentials
   * @returns {Response}
   */
  async register(credentials) {
    return this.#requestService.post('/api/register', {body: credentials});
  }

  /**
   * Loads information about user from the server.
   * @returns {Promise<Response>}
   */
  async loadUser() {
    return this.#requestService.get('/api/user', Storage.authToken);
  }

  /**
   * Loads information about folder by ID.
   * @param {number} folderId
   * @returns {Promise<Response>}
   */
  async loadFolder(folderId) {
    return this.#requestService.get(`/api/folder/${folderId}`, Storage.authToken);
  }

  /**
   * Loads information about folder content by ID.
   * @param {number} folderId
   * @param {{search: string}} [queryParameters]
   * @returns {Promise<Response>}
   */
  async loadFolderContent(folderId, queryParameters) {
    return this.#requestService.get(`/api/folder/${folderId}/content?` + new URLSearchParams(queryParameters),
        Storage.authToken);
  }

  /**
   * Deletes a folder by id.
   * @param {FolderModel} folderModel
   * @returns {Promise<Response>}
   */
  async deleteFolder(folderModel) {
    return this.#requestService.delete(`/api/folder/${folderModel.id}`, {
      authToken: Storage.authToken,
      body: folderModel,
    });
  }

  /**
   * Deletes a file by id.
   * @param {FileModel} fileModel
   * @returns {Promise<Response>}
   */
  async deleteFile(fileModel) {
    return this.#requestService.delete(`/api/file/${fileModel.id}`, {
      authToken: Storage.authToken,
      body: fileModel,
    });
  }

  /**
   * Uploads files to the directory.
   * @param {string} folderId
   * @param {[File]} files
   * @returns {Promise<Response>}
   */
  async uploadFiles(folderId, files) {
    const formData = files.reduce((formData, file, index) => {
      formData.append(`file_${index}`, file);
      return formData;
    }, new FormData());

    return this.#requestService.postMultipart(`/api/folder/${folderId}/content`, Storage.authToken, formData);
  }

  /**
   * Creates a new folder inside another.
   * @param {FolderModel} folderModel
   * @returns {Promise<Response>}
   */
  async createFolder(folderModel) {
    return this.#requestService.post(`/api/folder/${folderModel.parentId}`, {
      authToken: Storage.authToken,
      body: folderModel,
    });
  }

  /**
   * @param {FileModel} fileModel
   * @returns {Promise<Response>}
   */
  async download(fileModel) {
    const fetchResponseParser = (response) => response.blob();
    return this.#requestService.get(`/api/file/${fileModel.id}`, Storage.authToken, fetchResponseParser);
  }

  /**
   * Performs logout request.
   * @returns {Promise<Response>}
   */
  async logOut() {
    return this.#requestService.post('/api/logout', {authToken: Storage.authToken});
  }

  async editFile(fileModel) {
    return this.#requestService.put(`/api/file/${fileModel.id}`, {authToken: Storage.authToken, body: fileModel});
  }

  async editFolder(folderModel) {
    return this.#requestService.put(`/api/folder/${folderModel.id}`, {authToken: Storage.authToken, body: folderModel});
  }
}
