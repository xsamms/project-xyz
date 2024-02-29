import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createCalender = {
  body: Joi.object().keys({
    talentId: Joi.number(),
    agencyId: Joi.number(),
    managerId: Joi.number(),
    agencyManagerId: Joi.number(),
    eventTitle: Joi.string(),
    description: Joi.string(),
    eventVenue: Joi.string(),
    eventCity: Joi.string(),
    eventCountry: Joi.string(),
    eventDate: Joi.string(),
    eventTime: Joi.string()
  })
};

const getCalenders = {
  query: Joi.object().keys({
    EventTitle: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getCalender = {
  params: Joi.object().keys({
    calenderId: Joi.number().integer()
  })
};

const updateCalender = {
  params: Joi.object().keys({
    calenderId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
    eventTitle: Joi.string(),
    description: Joi.string(),
    eventVenue: Joi.number(),
    eventCity: Joi.string(),
    eventCountry: Joi.string(),
    eventDate: Joi.date(),
    eventTime: Joi.date()
    })
    .min(1)
};

const deleteCalender = {
  params: Joi.object().keys({
    calenderId: Joi.number().integer()
  })
};

export default {
  createCalender,
  getCalenders,
  getCalender,
  updateCalender,
  deleteCalender
};
