export const FORM_FIELDS_NAME = {
  FIRST_NAME: {
    name: 'firstname',
    label: 'signup.form.first_name',
    type: 'text',
    placeholder: 'OTPFORM.firstNameLabel',
    rules: {
      required: 'signup.error.first_name',
    },
  },

  LAST_NAME: {
    name: 'lastname',
    label:'signup.form.last_name',
    type: 'text',
    placeholder: 'OTPFORM.lastNameLabel',
    rules: {
      required: 'signup.error.last_name',
    },
  },
  PHONE_NUMBER: {
    name: 'phone',
    label: 'signup.form.phone_number',
    type: 'number',
    placeholder: 'OTPFORM.mobileNumberLabel',
    rules: {
      required: 'signup.error.phone_number',
    },
  },

  OTP: {
    name: 'otp',
    label: 'OTPFORM.otp',
    type: 'number',
    placeholder: 'Enter your OTP',
    rules: {
      required: 'OTPFORM.otpRequired',
      length: {
        value: 4,
        message: 'OTP must be 4 characters',
      },
    },
  },

  TYPE: {
    name: 'type',
    label: 'signup.form.Role',
    type: 'text',
    placeholder: 'OTPFORM.selectTypeLabel',
    rules: {
      required: 'signup.error.Role',
    },
  },

  PRODUCER: {
    name: 'producer',
    label: 'Producer Type',
    type: 'text',
    placeholder: 'Enter Producer Type',
    rules: {
      required: 'Producer is required',
    },
  },

  ADDRESS: {
    name: 'address',
    label: 'signup.form.Address',
    type: 'text',
    placeholder: 'OTPFORM.addressLabel',
    rules: {
      required: 'signup.error.Address',
    },
  },
}
