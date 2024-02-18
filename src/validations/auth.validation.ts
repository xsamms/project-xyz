import Joi from 'joi';
import { password } from './custom.validation';
import { empty } from '@prisma/client/runtime/library';

const registerAsAgency = {
  body: Joi.object().keys({
    userId: Joi.number(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string(),
    mobileNumber: Joi.string(),
    verificationType: Joi.string(),
    agencyName: Joi.string(),
    regNumber: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    state: Joi.string(),
    country: Joi.string()
  })
};


const registerAsManager = {
  body: Joi.object().keys({
    userId: Joi.number(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string(),
    mobileNumber: Joi.string(),
    verificationType: Joi.string(),
    agencyName: Joi.string(),
    regNumber: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    state: Joi.string(),
    country: Joi.string()
  })
};

const registerAsTalent = {
  body: Joi.object().keys({
    userId: Joi.number(),
    agencyId: Joi.number(),
    managerId: Joi.number(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string(),
    mobileNumber: Joi.string(),
    verificationType: Joi.string(),
    stageName: Joi.string(),
    bookingPrice: Joi.number(),
    industry: Joi.string()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};


const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password)
  })
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required()
  })
};


export default {
  registerAsAgency,
  registerAsManager,
  registerAsTalent,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail
};
