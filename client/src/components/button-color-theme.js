/**
 * Collection of a CSS styles for decorating buttons.
 */
export class ButtonColorTheme {
  /**
   * @returns {{backgroundColor: string, color: string}}
   */
  static get blue() {
    return {backgroundColor: '#3385cd', color: '#fff'};
  }

  /**
   * @returns {{backgroundColor: string, color: string}}
   */
  static get danger() {
    return {backgroundColor: '#db504b', color: '#fff'};
  }

  /**
   * @returns {{border: string, backgroundColor: string, color: string}}
   */
  static get white() {
    return {backgroundColor: '#fff', color: '#000', border: '1px solid #cccccc'};
  }
}
