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
    .email()
    .required()
    .messages({
      'string.base': `{#label} should be a type of 'text'`,
      'string.empty': `{#label} cannot be an empty field`,
      'string.min': `{#label} should have a minimum length of {#limit}`,
      'any.required': `{#label} is a required field`
    }),
  address: Joi.string()
    .max(18).allow('').optional(), //.optional() was a way of explicitly saying that that field in an object was optional.
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
/***********
 *  Function isUserValidated_2
 */
const isUserValidated_2 = (req, res, next) => {
  //console.log('-----------++++++++++',req);
  const incomingData = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    role: req.body.role,
  };
  console.log('incomingData=== ', incomingData);
  // To removing the backward slashes and the double quotes
  const validatorOptions = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

  try {
    //console.log('userValidator=== ', userValidator);
    const { error } = userValidator.validate(incomingData, validatorOptions);
    //console.log('error===', error);
    if (error) {
      return next(error);
    } else {
      ///---next();
    }
  } catch (err) {
    //console.log('err===', err);
    return next(err);
  }

}
/****
 * 
 */

const isValiLloginCredentials = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });
  const incomingData = {
    email: req.body.email,
    password: req.body.password,
  };
  const validatorOptions = {
    errors: {
      wrap: {
        label: ''
      }

    },
    //abortEarly: false,
  };
  const { error } = loginSchema.validate(incomingData, validatorOptions);

  if (error) {
    return next(error);
  } else {
    ///---next();
  }

}

//console.log('--- user validation ---');
module.exports = { isUserValidated_2, isValiLloginCredentials };