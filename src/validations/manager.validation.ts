import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createManager = {
  body: Joi.object().keys({
    userId: Joi.number(),
    agencyId: Joi.number().allow('').optional(),
    agencyName: Joi.string().required(),
    regNumber: Joi.string().allow('').optional(),
    industry: Joi.string().allow('').optional(),
    address: Joi.string().allow('').optional(),
    state: Joi.string().allow('').optional(),
    country: Joi.string().allow('').optional()
  })
};

const getManagers = {
  query: Joi.object().keys({
    AgencyName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getManager = {
  params: Joi.object().keys({
    agencyId: Joi.number().integer()
  })
};

const updateManager = {
  params: Joi.object().keys({
    agencyId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      agencyName: Joi.string(),
      regNumber: Joi.string(),
      industry: Joi.string(),
      address: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
    })
    .min(1)
};

const deleteManager = {
  params: Joi.object().keys({
    agencyId: Joi.number().integer()
  })
};

export default {
  createManager,
  getManagers,
  getManager,
  updateManager,
  deleteManager
};
