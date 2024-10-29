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
    given_name:{
      mutable: true,
      required: true,
      description: "The user's first name.",
    },
    family_name:{
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
    phone_number:{
      mutable: true,
      required: true,
    },
    isActive: {
      mutable: false,
      required: true,
    },
  },
});
