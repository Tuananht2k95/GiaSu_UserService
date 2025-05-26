import JoiDate from "@joi/date";
import BaseJoi from "joi";
import { USER } from "../../config/constant.js";
import baseJoiValidate from "../base.validation.js"

const Joi = BaseJoi.extend(JoiDate);
const passwordSchema = Joi.string()
    .max(255).min(6)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .messages({
        "string.pattern.base": "Mật khẩu phải chứa chữ hoa, chữ thường và số",
    });

const validateUpdateUserSchema = Joi.object({
    name: Joi.string().max(255),
    gender: Joi.number().valid( USER.gender.female, USER.gender.male ),
    dateOfBirth: Joi.date().format('DD/MM/YYYY').messages({
        "date.base": "Format khong dung"
    }),
    avatar: Joi.string().max(255),
});
const validateIndexUserSchema = Joi.object({
    limit: Joi.number().integer().min(1),
    page: Joi.number().min(1),
    keyword: Joi.string().max(255),
    role: Joi.number().valid( USER.role.admin, USER.role.teacher ),
});
const validateStoreUserSchema = Joi.object({
    name: Joi.string().max(255),
    email: Joi.string().max(255).required().email(),
    password: passwordSchema,
});
const validateUserIdSchema = Joi.object({
    userId: Joi.string().max(255).required(),
});
const validateLoginUserSchema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: passwordSchema,
});

export const validateStoreUser = baseJoiValidate( validateStoreUserSchema );
export const validateIndexUser = baseJoiValidate( validateIndexUserSchema, 'query' );
export const validateUpdateUser = baseJoiValidate( validateUpdateUserSchema );
export const validateUserId = baseJoiValidate( validateUserIdSchema, 'params' );
export const validateLoginUser = baseJoiValidate( validateLoginUserSchema );
