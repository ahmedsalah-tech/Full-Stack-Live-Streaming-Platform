import React, { useState } from 'react';
import { type LoginProps } from '../types/types';
import { Logo } from './Logo';
import { Input } from '../shared/components';
import {
  emailValidationMessage,
  passwordValidationMessage,
  validateEmail,
  validatePassword,
} from '../shared/validators';
import { useLogin } from '../shared/hooks';

export const Login = ({ switchAuthHandler }: LoginProps) => {
  const { login, isLoading } = useLogin();

  const [formState, setFormState] = useState({
    email: {
      value: '',
      isValid: false,
      showError: false,
    },
    password: {
      value: '',
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value: string, field: string) => {
    let isValid = false;
    switch (field) {
      case 'email':
        isValid = validateEmail(value);
        break;
      case 'password':
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field as 'email' | 'password'],
        value,
        isValid,
      },
    }));
  };

  const handleInputValidationOnBlur = (_value: string, field: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field as 'email' | 'password'],
        showError: !prevState[field as 'email' | 'password'].isValid,
      },
    }));
  };

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    login(formState.email.value, formState.password.value);
  };

  const isSubmitButtonDisabled =
    isLoading || !formState.password.isValid || !formState.email.isValid;

  return (
    <div className="login-container">
      <Logo text={'Login & Start Streaming'} />
      <form className="auth-form">
        <Input
          field="email"
          Label="Email"
          type="text"
          {...formState.email}
          onChangeHandler={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={emailValidationMessage}
        />
        <Input
          field="password"
          Label="Password"
          type="password"
          {...formState.password}
          onChangeHandler={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <button onClick={handleLogin} disabled={isSubmitButtonDisabled}>
          Log in
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        Don't have and account ? Sign Up
      </span>
    </div>
  );
};
