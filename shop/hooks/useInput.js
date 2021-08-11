import { useState } from 'react';

const useInput = (validator, initialVal) => {
  const [value, setValue] = useState(initialVal ? initialVal : '');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validator(value);
  const hasError = !isValid && isTouched;

  const onChangeText = (text) => {
    setValue(text);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue(initialVal ? initialVal : '');
    setIsTouched(false);
  };

  return { value, isValid, hasError, onChangeText, onBlur, reset };
};

export default useInput;
