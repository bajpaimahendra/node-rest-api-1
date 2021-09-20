const Joi = require('joi');

const userValidator = Joi.object({

        name: Joi.string()
                  .min(5)
                  .max(18)
                  .required()
                  .messages({
                        'string.base': `{#label} should be a type of 'text'`,
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                      }),
        email: Joi.string()
                        .min(5)
                        .max(18)
                        .required()
                        .messages({
                                'string.base': `{#label} should be a type of 'text'`,
                                'string.empty': `{#label} cannot be an empty field`,
                                'string.min': `{#label} should have a minimum length of {#limit}`,
                                'any.required': `{#label} is a required field`
                                }),
        address: Joi.string()
                    .min(5)
                    .max(90)
                    .required()
                    .messages({
                        'string.base': `{#label} should be a type of 'text'`,
                        'string.empty': `{#label} cannot be an empty field`,
                        'string.min': `{#label} should have a minimum length of {#limit}`,
                        'any.required': `{#label} is a required field`
                      }),
        password: Joi.string()
                      .min(3)
                      .max(90)
                      .required()
                      .messages({
                          'string.base': `{#label} should be a type of 'text'`,
                          'string.empty': `{#label} cannot be an empty field`,
                          'string.min': `{#label} should have a minimum length of {#limit}`,
                          'any.required': `{#label} is a required field`
                        }),
        role: Joi.string()
                        .allow('').optional() // followed by any other validations
                       ,                        

});
//console.log('--- user validation ---');
module.exports = userValidator;