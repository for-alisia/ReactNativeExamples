// @ts-nocheck
// Dependencies
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

// Component to test
import SbLink from '../SbLink';

describe('SbLink UI Component', () => {
  const testText = 'Hello';
  const mockOnPress = jest.fn();

  it('renders a link with a passed text', () => {
    const { getByText, toJSON } = render(<SbLink>{testText}</SbLink>);
    const text = getByText(testText);

    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls a correct handler once', () => {
    const { getByText } = render(<SbLink onPress={mockOnPress}>{testText}</SbLink>);
    const link = getByText(testText);
    fireEvent.press(link);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
