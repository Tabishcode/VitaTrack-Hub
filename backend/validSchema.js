
const Joi = require('joi');

const foodSchema = Joi.object({
    name: Joi.string().required(),  
    calories: Joi.number().required().min(0),
    proteins: Joi.number().min(0),
    carbs: Joi.number().min(0),
    fats: Joi.number().min(0),
    sugars: Joi.number().min(0)
});

module.exports = {
    foodSchema
};
