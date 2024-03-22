import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { invoiceService } from '../services';

const createInvoice = catchAsync(async (req, res) => {
  const { userId, talentId, agencyId, managerId, clientName, clientEmail, eventType, eventDate, billOption, fee, logisticInfo, logisticFee, TnC, totalFee} = req.body;
  const invoice = await invoiceService.createInvoice( userId, talentId, agencyId, managerId, clientName, clientEmail, eventType, eventDate, billOption, fee, logisticInfo, logisticFee, TnC, totalFee);
  res.status(httpStatus.CREATED).send(invoice);
});

const getInvoices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['clientEmail']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await invoiceService.queryInvoices(filter, options);
  res.send(result);
});

const getInvoice = catchAsync(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req.params.invoiceId);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not found');
  }
  res.send(invoice);
});

const updateInvoice = catchAsync(async (req, res) => {
  const invoice = await invoiceService.updateInvoiceById(req.params.invoiceId, req.body);
  res.send(invoice);
});

const deleteInvoice = catchAsync(async (req, res) => {
  await invoiceService.deleteInvoiceById(req.params.invoiceId);
  res.status(httpStatus.NO_CONTENT).send({message: "Invoice deleted successfully"});
});

export default {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice
};
