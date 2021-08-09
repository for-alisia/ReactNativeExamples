// @ts-nocheck
// Dependencies
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

// Component to test
import SbQtyControl from '../SbQtyControl';

describe('SbQtyControl UI Component', () => {
  const testQty = 5;
  const mockOnAdd = jest.fn();
  const mockOnSubstract = jest.fn();

  it('renders correctly with passed quantity', () => {
    const { getByText, getByTestId, toJSON } = render(<SbQtyControl qty={testQty} />);
    const text = getByText(testQty.toString());
    const element = getByTestId('control-ui');
    const minus = getByTestId('control-minus');
    const plus = getByTestId('control-plus');

    expect(text).toBeTruthy();
    expect(element).toBeTruthy();
    expect(minus).toBeTruthy();
    expect(plus).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls appropriate handlers', () => {
    const { getByTestId } = render(
      <SbQtyControl qty={testQty} onAdd={mockOnAdd} onSubstract={mockOnSubstract} />
    );
    const minus = getByTestId('control-minus');
    const plus = getByTestId('control-plus');

    fireEvent.press(minus);
    fireEvent.press(plus);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnSubstract).toHaveBeenCalledTimes(1);

    fireEvent.press(minus);
    fireEvent.press(plus);

    expect(mockOnAdd).toHaveBeenCalledTimes(2);
    expect(mockOnSubstract).toHaveBeenCalledTimes(2);
  });
});
