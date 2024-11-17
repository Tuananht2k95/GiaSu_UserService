import baseJoiValidate from "../base.validation";
import JoiDate from "@joi/date";
import BaseJoi from "joi";
const Joi = BaseJoi.extend(JoiDate);

const addressValidationSchema = Joi.object({
    ward: Joi.string().max(255).required(),
    address: Joi.string().max(255).required(),
})

export const validateStoreProduct = baseJoiValidate(
    Joi.object({
       name: Joi.string().max(255).required(),
       phone: Joi.string().max(11).min(4).required(),
       gender: Joi.number().required(),
       dateOfBirth: Joi.date().format('DD/MM/YYYY').messages({
        "date.base": "Format khong dung"
       }),
       levelStudent: Joi.number().required(),
       levelTeacher: Joi.number().required(),
       address: addressValidationSchema.required(),
    })
)