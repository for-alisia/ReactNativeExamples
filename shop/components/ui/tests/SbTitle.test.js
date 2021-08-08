// @ts-nocheck
// Dependencies
import React from 'react';
import { render } from '@testing-library/react-native';
import { toHaveStyle } from '@testing-library/jest-native';

// Component
import SbTitle from '../SbTitle';

// Theme
import theme from '../../../theme';

describe('SbTitle UI Component', () => {
  // To use toHaveStyle
  expect.extend({ toHaveStyle });
  const testText = 'Hello';

  it('renders a text', () => {
    const { getByText, toJSON } = render(<SbTitle>{testText}</SbTitle>);
    const textElement = getByText(testText);

    expect(textElement).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correct styles by default', () => {
    const { getByText } = render(<SbTitle>{testText}</SbTitle>);
    const textElement = getByText(testText);

    expect(textElement).toHaveStyle({
      fontFamily: theme.fonts.monserratBold,
      fontSize: theme.fontSize.s,
      color: theme.colors.primary,
    });
  });
});
