import joi from "joi";

export const usersSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
})

export const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});