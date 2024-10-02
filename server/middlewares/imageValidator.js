const { body, validationResult } = require('express-validator');


const imageValidatorRules = () => {
    return [
      body('title')
        .trim() 
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 1 }).withMessage('Title must be at least 1 character long'), 
      body('description')
        .trim() 
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 1 }).withMessage('Description must be at least 1 character long'), 
    ];
  };

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};

module.exports = {
  imageValidatorRules,
  validate,
};
