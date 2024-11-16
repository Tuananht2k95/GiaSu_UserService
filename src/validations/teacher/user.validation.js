import baseJoiValidate from "../base.validation.js";
import JoiDate from "@joi/date";
import BaseJoi from "joi";
const Joi = BaseJoi.extend(JoiDate);

export const validateStoreUser = baseJoiValidate(
    Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().max(255).required().email(),
        phone: Joi.string().max(11).min(4).required(),
        password: Joi.string().max(255).min(6).required(),
        avatar: Joi.string().max(255),
        gender: Joi.number().required(),
        dateOfBirth: Joi.date().format('DD/MM/YYYY').messages({
            "date.base": "Format khong dung"
        }),
        role: Joi.number().required(),
    })
)

export const validateUpdateUser = baseJoiValidate(
    Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().max(255).email(),
        phone: Joi.string().max(11).min(4),
        avatar: Joi.string().max(255),
        gender: Joi.number(),
        dateOfBirth: Joi.date().format('DD/MM/YYYY').messages({
            "date.base": "Format khong dung"
        })
    })
)