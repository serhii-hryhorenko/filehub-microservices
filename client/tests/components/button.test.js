import {afterEach, describe, expect, test} from '@jest/globals';
import {Button} from '../../js/components/button.js';
import {innerHtml, oneLineMarkup} from '../util/markup-validation.js';
import {clearDocumentBody} from '../util/setup-callbacks.js';

describe('Primary button test', () => {
  afterEach(clearDocumentBody);

  test('Should properly initialize button component', () => {
    const text = 'Click Me!';
    const button = new Button(document.body, {text});

    const renderedButton = document.body.firstElementChild;

    expect(innerHtml(renderedButton)).toBe(button.title);
    expect(renderedButton.classList.contains('button'));
  });

  test('Should produce equivalent redirect message markup', () => {
    const text = 'Click Me!';
    new Button(document.body, {text});

    const renderedButton = document.body.firstElementChild;

    const markup = `<button type="submit" class="button" title="${text}">${text}</button>`;

    expect(oneLineMarkup(renderedButton)).toBe(markup);
  });
});
