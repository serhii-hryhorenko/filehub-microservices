import {afterEach, describe, expect, test} from '@jest/globals';
import {Link} from '../../js/components/link.js';
import {oneLineMarkup} from '../util/markup-validation.js';
import {clearDocumentBody} from '../util/setup-callbacks.js';

describe('Redirect message test', () => {
  afterEach(clearDocumentBody);

  test('Should properly initialize redirect message component', () => {
    const message = 'Click Me!';
    const url = 'serhii.com';

    new Link(document.body, {text: message, url});

    const renderedRedirectMessage = document.body.firstElementChild;

    const renderedMessage = renderedRedirectMessage.innerHTML;

    const renderedUrl = renderedRedirectMessage.href;

    expect(renderedMessage).toBe(message);
    expect(renderedUrl).toBe(`http://localhost/${url}`);
  });

  test('Should produce equivalent redirect message markup', () => {
    const message = 'Click Me!';
    new Link(document.body, {text: message});

    const renderedMessage = document.body.firstElementChild;

    const markup = `<a href="#" class="link">${message}</a>`;

    expect(oneLineMarkup(renderedMessage)).toBe(markup);
  });
});
