// @ts-nocheck
// Dependencies
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { toHaveStyle } from '@testing-library/jest-native';

// Component to test
import SbDoubleButton from '../SbDoubleButton';

// Theme
import theme from '../../../theme';

describe('SbDoubleButton UI Component', () => {
  // To use toHaveStyle
  expect.extend({ toHaveStyle });
  const textLeft = 'Hello';
  const textRight = 'World';

  it('renders button with a correct text', () => {
    const { getByText, toJSON } = render(
      <SbDoubleButton leftLabel={textLeft} rightLabel={textRight} />
    );
    const foundLeftText = getByText(textLeft);
    const foundRightText = getByText(textRight);

    expect(foundLeftText).toBeTruthy();
    expect(foundRightText).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls handlers functions correctly', () => {
    const fnRight = jest.fn();
    const fnLeft = jest.fn();

    const { getByText } = render(
      <SbDoubleButton
        leftLabel={textLeft}
        rightLabel={textRight}
        onRightPress={fnRight}
        onLeftPress={fnLeft}
      />
    );

    const left = getByText(textLeft);
    const right = getByText(textRight);

    fireEvent.press(left);
    expect(fnLeft).toHaveBeenCalled();

    fireEvent.press(right);
    expect(fnRight).toHaveBeenCalled();
  });

  it('works correctly with disabled buttons', () => {
    const fnRight = jest.fn();
    const fnLeft = jest.fn();

    const { getByText } = render(
      <SbDoubleButton
        leftLabel={textLeft}
        rightLabel={textRight}
        onRightPress={fnRight}
        onLeftPress={fnLeft}
        disabledRight={true}
        disabledLeft={true}
      />
    );

    const left = getByText(textLeft);
    const right = getByText(textRight);

    fireEvent.press(left);
    expect(fnLeft).not.toHaveBeenCalled();

    fireEvent.press(right);
    expect(fnRight).not.toHaveBeenCalled();
  });

  it('renders outline styled button', () => {
    const { getByText } = render(
      <SbDoubleButton leftLabel={textLeft} rightLabel={textRight} type="outline" />
    );

    const left = getByText(textLeft);
    const right = getByText(textRight);

    expect(left).toHaveStyle({
      color: theme.colors.primary,
    });

    expect(right).toHaveStyle({
      color: theme.colors.primary,
    });
  });
});
