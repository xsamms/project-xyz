import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createAgencyManager = {
  body: Joi.object().keys({
    userId: Joi.number(),
    agencyId: Joi.number(),
    gender: Joi.string()
  })
};

const getAgencyManagers = {
  query: Joi.object().keys({
    AgencyName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getAgencyManager = {
  params: Joi.object().keys({
    agencyManagerId: Joi.number().integer()
  })
};

const updateAgencyManager = {
  params: Joi.object().keys({
    agencyManagerId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      gender: Joi.string()
    })
    .min(1)
};

const deleteAgencyManager = {
  params: Joi.object().keys({
    agencyManagerId: Joi.number().integer()
  })
};

export default {
  createAgencyManager,
  getAgencyManagers,
  getAgencyManager,
  updateAgencyManager,
  deleteAgencyManager
};
