import Joi from 'joi';
import { Role } from '@prisma/client';
import { password } from './custom.validation';
import { empty } from '@prisma/client/runtime/library';

const registerAsAgency = {
  body: Joi.object().keys({
    userId: Joi.number(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().allow('').optional(),
    mobileNumber: Joi.string().allow('').optional(),
    verificationType: Joi.string().allow('').optional(),
    agencyName: Joi.string().allow('').optional(),
    regNumber: Joi.string().allow('').optional(),
    industry: Joi.string().allow('').optional(),
    address: Joi.string().allow('').optional(),
    state: Joi.string().allow('').optional(),
    country: Joi.string().allow('').optional()
  })
};


const registerAsManager = {
  body: Joi.object().keys({
    userId: Joi.number(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().allow('').optional(),
    mobileNumber: Joi.string().allow('').optional(),
    verificationType: Joi.string().allow('').optional(),
    agencyName: Joi.string().allow('').optional(),
    regNumber: Joi.string().allow('').optional(),
    industry: Joi.string().allow('').optional(),
    address: Joi.string().allow('').optional(),
    state: Joi.string().allow('').optional(),
    country: Joi.string().allow('').optional()
  })
};

const registerAsTalent = {
  body: Joi.object().keys({
    userId: Joi.number(),
    agencyId: Joi.number().allow('').optional(),
    agencyManagerId: Joi.number().allow('').optional(),
    managerId: Joi.number().allow('').optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().allow('').optional(),
    mobileNumber: Joi.string().allow('').optional(),
    verificationType: Joi.string().allow('').optional(),
    stageName: Joi.string().allow('').optional(),
    bookingPrice: Joi.number().allow('').optional(),
    industry: Joi.string().allow('').optional()
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
