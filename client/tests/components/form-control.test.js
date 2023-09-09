import {describe, expect, test} from '@jest/globals';
import {FormControl} from '../../src/components/form-control.js';
import {oneLineMarkup} from '../util/markup-validation.js';

describe('Form control test', () => {
  test('Should properly initialize form control component', () => {
    const label = 'Name';
    const placeholder = 'Serhii';
    const inputElementName = 'username';

    new FormControl(document.body, label, placeholder, inputElementName);

    const renderedFormControl = document.body.firstElementChild;

    const formControlLabel = renderedFormControl.getElementsByTagName('label').item(0);

    const inputElement = renderedFormControl.getElementsByTagName('input').item(0);

    const inputOuterParent = inputElement.parentElement;

    expect(formControlLabel.innerHTML).toBe(label);
    expect(oneLineMarkup(inputOuterParent)).toBe(oneLineMarkup(renderedFormControl));
    expect(inputElement.name).toBe(inputElementName);
    expect(inputElement.placeholder).toBe(placeholder);
    expect(renderedFormControl.classList).toContain('form-row');
  });
});
