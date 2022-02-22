import React from 'react';

type Props = {
  children: React.ReactNode;
  errorText: string;
  errorId: string;
  hasSubmited: boolean;
};

const ErrorContainer = ({ children, errorText, errorId, hasSubmited }: Props) => {
  return (
    <div className={errorText && hasSubmited ? 'error' : ''}>
      {children}
      {!!errorText && hasSubmited && (
        <div className="error-wrapper">
          <span id={errorId}>{errorText}</span>
        </div>
      )}
    </div>
  );
};

export default ErrorContainer;
