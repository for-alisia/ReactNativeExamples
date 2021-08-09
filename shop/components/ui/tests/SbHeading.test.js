// @ts-nocheck
// Dependencies
import React from 'react';
import { render } from '@testing-library/react-native';

// Component to test
import SbHeading from '../SbHeading';

describe('SbHeading UI Component', () => {
  const testText = 'Hello';

  it('renders a heading component with correct text', () => {
    const { getAllByText, toJSON } = render(<SbHeading>{testText}</SbHeading>);
    const foundText = getAllByText(testText);
    expect(foundText.length).toEqual(2);
    expect(foundText[0].props.children).toEqual(testText);
    expect(toJSON()).toMatchSnapshot();
  });
});
