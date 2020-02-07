/**
 * These are the rules used to validate the form while editing. The 'required' rule has been removed to avoid
 * marking all the other required fields as 'wrong' while still editing
 */
export const inplaceFormvalidationRules = {
  ruleSets: [
    {
      fields: {
        url: [
          {
            type: 'VALID_URL',
          },
        ],
        'webpush.variantID': [
          {
            type: 'isUUID',
          },
        ],
        'webpush.variantSecret': [
          {
            type: 'isUUID',
          },
        ],
      },
    },
  ],
};

/**
 * These are the rules used to perform the final validation.
 */
export const formValidationRules = {
  ruleSets: [
    {
      fields: {
        url: [
          {
            type: 'VALID_URL',
          },
          {
            type: 'REQUIRED',
          },
        ],
        'webpush.variantID': [
          {
            type: 'isUUID',
          },
          {
            type: 'REQUIRED',
          },
        ],
        'webpush.variantSecret': [
          {
            type: 'isUUID',
          },
          {
            type: 'REQUIRED',
          },
        ],
        'webpush.appServerKey': [
          {
            type: 'REQUIRED',
          },
        ],
      },
    },
  ],
};
