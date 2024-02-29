import { InquiryType } from '@prisma/client';
import Joi from 'joi';


const createInquiry = {
  body: Joi.object().keys({
    talentId: Joi.number(),
    agencyId: Joi.number(),
    managerId: Joi.number(),
    agencyManagerId: Joi.number(),
    fullName: Joi.string(),
    stageName: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    type: Joi.string().required().valid(InquiryType.Booking, InquiryType.Proposal, InquiryType.Collaboration),
    subject: Joi.string(),
    message: Joi.string(),
    attachment: Joi.array().items(Joi.string()),
    eventType: Joi.string(),
    eventVenue: Joi.string(),
    eventCity: Joi.string(),
    eventCountry: Joi.string(),
    eventDate: Joi.string(),
    eventTime: Joi.string()
  })
};

const getInquiries = {
  query: Joi.object().keys({
    stageName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getInquiry = {
  params: Joi.object().keys({
    inquiryId: Joi.number().integer()
  })
};

const updateInquiry = {
  params: Joi.object().keys({
    inquiryId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
        fullName: Joi.string(),
        stageName: Joi.string(),
        email: Joi.string().email(),
        phoneNumber: Joi.string(),
        type: Joi.string().required().valid(InquiryType.Booking, InquiryType.Proposal, InquiryType.Collaboration),
        subject: Joi.string(),
        message: Joi.string(),
        attachment: Joi.array().items(Joi.string()),
        eventType: Joi.string(),
        eventVenue: Joi.string(),
        eventCity: Joi.string(),
        eventCountry: Joi.string(),
        eventDate: Joi.string(),
        eventTime: Joi.string()
    })
    .min(1)
};

const deleteInquiry = {
  params: Joi.object().keys({
    inquiryId: Joi.number().integer()
  })
};

export default {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry
};
