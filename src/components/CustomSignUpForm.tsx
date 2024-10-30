// CustomSignUpForm.js
import { Authenticator } from '@aws-amplify/ui-react';

const CustomSignUpForm = () => (
  <Authenticator
    initialState="signUp"
    formFields={{
      signUp: {
        email: {
          label: "Email Address",
          placeholder: "Enter your email",
          isRequired: true,
        },
        password: {
          label: "Password",
          placeholder: "Create a strong password",
          isRequired: true,
        },
        confirm_password: {
          label: "Confirm Password",
          placeholder: "Confirm your password",
          isRequired: true,
        },
        "custom:scac": {
          label: "SCAC Code",
          placeholder: "Enter your SCAC",
          isRequired: true,
        },
      },
    }}
  />
);

export default CustomSignUpForm;
