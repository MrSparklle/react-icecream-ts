import { useEffect, useState } from 'react';

const useValidation = (
  value: number | string,
  errorId: string,
  showError: boolean,
  isRequired: boolean,
  validatorFN: Function,
  compareValue: any = null
) => {
  const [error, setError] = useState('');

  useEffect(() => {
    setError(validatorFN(value, compareValue));
  }, [compareValue, validatorFN, value]);

  return [
    error,
    {
      'aria-describedby': error && showError ? errorId : null,
      'aria-invalid': error && showError ? 'true' : false,
      'aria-required': isRequired ? 'true' : null,
      required: isRequired
    },
  ];
};
export default useValidation;
