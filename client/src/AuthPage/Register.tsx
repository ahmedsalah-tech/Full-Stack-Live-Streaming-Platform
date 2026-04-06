import { useState } from 'react';
import { type LoginProps } from '../types/types';
import { Logo } from './Logo';
import { Input } from '../shared/components';
import {
  emailValidationMessage,
  passwordConfValidationMessage,
  passwordValidationMessage,
  usernameValidationMessage,
  validateEmail,
  validatePassword,
  validatePasswordConf,
  validateUsername,
} from '../shared/validators';
import { useRegister } from '../shared/hooks';

export const Register = ({ switchAuthHandler }: LoginProps) => {
  const { isLoading, register } = useRegister();

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
    username: {
      value: '',
      isValid: false,
      showError: false,
    },
    passwordConf: {
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
      case 'username':
        isValid = validateUsername(value);
        break;
      case 'passwordConf':
        isValid = validatePasswordConf(formState.password.value, value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[
          field as 'email' | 'password' | 'username' | 'passwordConf'
        ],
        value,
        isValid,
      },
    }));
  };

  const handleInputValidationOnBlur = (_value: string, field: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[
          field as 'email' | 'password' | 'username' | 'passwordConf'
        ],
        showError:
          !prevState[
            field as 'email' | 'password' | 'username' | 'passwordConf'
          ].isValid,
      },
    }));
  };

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    register(
      formState.email.value,
      formState.password.value,
      formState.username.value
    );
  };

  const isSubmitButtonDisabled =
    !formState.password.isValid ||
    !formState.email.isValid ||
    !formState.username.isValid ||
    formState.password.isValid !== formState.passwordConf.isValid ||
    isLoading;

  return (
    <div className="register-container">
      <Logo text={'Signup & Start Streaming'} />
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
          field="username"
          Label="Username"
          type="text"
          {...formState.username}
          onChangeHandler={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.username.showError}
          validationMessage={usernameValidationMessage}
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
        <Input
          field="passwordConf"
          Label="Password confirmation"
          type="password"
          {...formState.passwordConf}
          onChangeHandler={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.passwordConf.showError}
          validationMessage={passwordConfValidationMessage}
        />

        <button onClick={handleRegister} disabled={isSubmitButtonDisabled}>
          Register
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        Already have an account ? Sign in
      </span>
    </div>
  );
};
