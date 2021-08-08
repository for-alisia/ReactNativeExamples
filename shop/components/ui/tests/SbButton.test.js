// @ts-nocheck
// Dependencies
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { toHaveStyle } from '@testing-library/jest-native';

// Component to test
import SbButton from '../SbButton';

// Theme
import theme from '../../../theme';

describe('SbButton tests', () => {
  // To use toHaveStyle
  expect.extend({ toHaveStyle });
  const testText = 'Hello';

  it('renders a button with correct text', () => {
    const { getByText, toJSON } = render(<SbButton>{testText}</SbButton>);
    const foundText = getByText(testText);
    expect(foundText.props.children).toEqual(testText);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correct styles by default', () => {
    const { getByTestId, getByText } = render(<SbButton>{testText}</SbButton>);
    const container = getByTestId('btn-container');
    const text = getByText(testText);

    expect(container).toBeTruthy();
    expect(text).toBeTruthy();
    expect(container).toHaveStyle({
      backgroundColor: theme.colors.primary,
    });
    expect(text).toHaveStyle({
      color: theme.colors.light,
    });
  });

  it('renders outlined styled button', () => {
    const { getByTestId, getByText, toJSON } = render(
      <SbButton type="outline">{testText}</SbButton>
    );
    const container = getByTestId('btn-container');
    const text = getByText(testText);

    expect(container).toBeTruthy();
    expect(text).toBeTruthy();

    expect(container).toHaveStyle({
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: 1,
    });

    expect(text).toHaveStyle({
      color: theme.colors.primary,
    });

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders a clickable button', () => {
    // Mock press function
    const onClickHandler = jest.fn();
    const { getByText } = render(<SbButton onPress={onClickHandler}>{testText}</SbButton>);
    const button = getByText(testText);
    fireEvent.press(button);
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('renders disabled button', () => {
    // Mock press function
    const onClickHandler = jest.fn();
    const { getByText } = render(
      <SbButton onPress={onClickHandler} disabled>
        {testText}
      </SbButton>
    );
    const button = getByText(testText);
    fireEvent.press(button);
    expect(onClickHandler).not.toHaveBeenCalled();
  });
});
