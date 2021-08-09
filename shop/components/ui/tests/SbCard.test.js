// @ts-nocheck
// Dependencies
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

// Component
import SbCard from '../SbCard';

describe('SbCard UI Component', () => {
  const testText = 'Hello';
  const testElement = <Text>{testText}</Text>;

  it('renders a card with a child', () => {
    const { getByTestId, toJSON, getByText } = render(<SbCard>{testElement}</SbCard>);
    const card = getByTestId('ui-card');
    const text = getByText(testText);

    expect(card).toBeTruthy();
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
