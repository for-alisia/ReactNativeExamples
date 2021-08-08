// @ts-nocheck
// Dependencies
import React from 'react';
import { render } from '@testing-library/react-native';
import { toHaveStyle } from '@testing-library/jest-native';

// Component
import SbText from '../SbText';

// Theme
import theme from '../../../theme';

describe('SbText UI Component', () => {
  // To use toHaveStyle
  expect.extend({ toHaveStyle });
  const testText = 'Hello';

  it('renders a text', () => {
    const { getByText, toJSON } = render(<SbText>{testText}</SbText>);
    const textElement = getByText(testText);

    expect(textElement).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correct styles by default', () => {
    const { getByText } = render(<SbText>{testText}</SbText>);
    const textElement = getByText(testText);

    expect(textElement).toHaveStyle({
      fontSize: theme.fontSize.s,
      color: theme.colors.dark,
    });
  });

  it('renders a bold text', () => {
    const { getByText } = render(<SbText bold>{testText}</SbText>);
    const textElement = getByText(testText);
    expect(textElement).toHaveStyle({
      fontFamily: theme.fonts.monserratBold,
    });
  });
});
