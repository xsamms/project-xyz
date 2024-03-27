import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createCalendar = {
  body: Joi.object().keys({
    userId: Joi.number().integer().required(),
    eventTitle: Joi.string(),
    description: Joi.string(),
    eventVenue: Joi.string(),
    eventCity: Joi.string(),
    eventCountry: Joi.string(),
    eventDate: Joi.string(),
    eventTime: Joi.string()
  })
};

const getCalendars = {
  query: Joi.object().keys({
    EventTitle: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getCalendar = {
  params: Joi.object().keys({
    calendarId: Joi.number().integer()
  })
};

const getCalendarByUserId = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const updateCalendar = {
  params: Joi.object().keys({
    calendarId: Joi.number().integer()
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

const deleteCalendar = {
  params: Joi.object().keys({
    calendarId: Joi.number().integer()
  })
};

export default {
  createCalendar,
  getCalendars,
  getCalendar,
  getCalendarByUserId,
  updateCalendar,
  deleteCalendar
};
