import Joi from 'joi';


const createInvoice = {
  body: Joi.object().keys({
    talentId: Joi.number(),
    agencyId: Joi.number(),
    managerId: Joi.number(),
    clientName: Joi.string(),
    clientEmail: Joi.string().email(),
    eventType: Joi.string(),
    eventDate: Joi.string(),
    billOption: Joi.string(),
    fee: Joi.number(),
    logisticInfo: Joi.string(),
    logisticFee: Joi.number(),
    TnC: Joi.string(),
    totalFee: Joi.number()
  })
};

const getInvoices = {
  query: Joi.object().keys({
    clientName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getInvoice = {
  params: Joi.object().keys({
    invoiceId: Joi.number().integer()
  })
};

const updateInvoice = {
  params: Joi.object().keys({
    invoiceId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
        clientName: Joi.string(),
        clientEmail: Joi.string().email(),
        eventType: Joi.string(),
        eventDate: Joi.string(),
        billOption: Joi.string(),
        fee: Joi.number(),
        logisticInfo: Joi.string(),
        logisticFee: Joi.number(),
        TnC: Joi.string(),
        totalFee: Joi.number()
    })
    .min(1)
};

const deleteInvoice = {
  params: Joi.object().keys({
    invoiceId: Joi.number().integer()
  })
};

export default {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice
};
