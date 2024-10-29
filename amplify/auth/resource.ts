import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    firstName:{
      mutable: true,
      required: true,
      description: "The user's first name.",
    },
    lastName:{
      mutable: true,
      required: true,
      description: "The user's last name.",
    },
    scac:{
      mutable: false,
      required: true,
      description: "The Amazon provided designation code for the user's company.",
    },
    companyName:{
      mutable: true,
      required: false,
      description: "Name of the user's company.",
    },
    phoneNumber: {
      mutable: true,
      required: true,
      validations: [
        {
          type: "regex",
          value: /^\+?[1-9]\d{1,14}$/, // E.164 phone number format
        },
      ],
    },
    isActive: {
      mutable: false,
      required: true,
    },
  },
});
