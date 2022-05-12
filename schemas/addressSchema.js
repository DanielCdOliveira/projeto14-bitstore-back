import joi from "joi";

export const addressSchema = joi.object({
    cep: joi.number().required(),
    endereco: joi.string().required(),
    numero: joi.number().required(),
    complemento: joi.string(),
    bairro: joi.string().required(),
    cidade: joi.string().required(),
    estado: joi.string().required()
});