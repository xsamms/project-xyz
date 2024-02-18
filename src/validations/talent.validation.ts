import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createTalent = {
  body: Joi.object().keys({
    userId: Joi.number(),
    agencyId: Joi.number(),
    agencyManagerId: Joi.number(),
    managerId: Joi.number(),
    stageName: Joi.string().required(),
    industry: Joi.string(),
    bookingPrice: Joi.number()
  })
};

const getTalents = {
  query: Joi.object().keys({
    AgencyName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getTalent = {
  params: Joi.object().keys({
    talentId: Joi.number().integer()
  })
};

const updateTalent = {
  params: Joi.object().keys({
    talentId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
        stageName: Joi.string().required(),
        industry: Joi.string(),
        bookingPrice: Joi.number()
    })
    .min(1)
};

const deleteTalent = {
  params: Joi.object().keys({
    talentId: Joi.number().integer()
  })
};

export default {
  createTalent,
  getTalents,
  getTalent,
  updateTalent,
  deleteTalent
};
