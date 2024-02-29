import { Invoice, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import { encryptPassword } from '../utils/encryption';

/**
 * Create a invoice
 * @param {Object} invoiceBody
 * @returns {Promise<Invoice>}
 */
const createInvoice = async (
    talentId: number,
    agencyId: number,
    managerId: number,
    clientName: string,
    clientEmail: string,
    eventType: string,
    eventDate: Date,
    billOption: string,
    fee: number,
    logisticInfo: string,
    logisticFee: number,
    TnC: string,
    totalFee: number
): Promise<Invoice> => {
  
  return prisma.invoice.create({
    data: {
        talentId,
        agencyId,
        managerId,
        clientName,
        clientEmail,
        eventType,
        eventDate,
        billOption,
        fee,
        logisticInfo,
        logisticFee,
        TnC,
        totalFee
    }
  });
};


/**
 * Query for invoices
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInvoices = async <Key extends keyof Invoice>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'talentId',
    'agencyId',
    'managerId',
    'clientName',
    'clientEmail',
    'eventType',
    'eventDate',
    'billOption',
    'fee',
    'logisticInfo',
    'logisticFee',
    'TnC',
    'totalFee',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Invoice, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const invoices = await prisma.invoice.findMany({
    // where: filter,
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    // skip: page * limit,
    // take: limit,
    // orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return invoices as Pick<Invoice, Key>[];
};

/**
 * Get invoice by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Invoice, Key> | null>}
 */
const getInvoiceById = async <Key extends keyof Invoice>(
  id: number,
  keys: Key[] = [
    'id',
    'talentId',
    'agencyId',
    'managerId',
    'clientName',
    'clientEmail',
    'eventType',
    'eventDate',
    'billOption',
    'fee',
    'logisticInfo',
    'logisticFee',
    'TnC',
    'totalFee',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Invoice, Key> | null> => {
  return prisma.invoice.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Invoice, Key> | null>;
};

/**
 * Get invoice by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Invoice, Key> | null>}
 */
// const getInvoiceByClientEmail = async <Key extends keyof Invoice>(
//   email: string,
//   keys: Key[] = [
//     'id',
//     'talentId',
//     'agencyId',
//     'managerId',
//     'clientName',
//     'clientEmail',
//     'eventType',
//     'eventDate',
//     'billOption',
//     'fee',
//     'logisticInfo',
//     'logisticFee',
//     'TnC',
//     'totalFee',
//     'createdAt',
//     'updatedAt'
//   ] as Key[]
// ): Promise<Pick<Invoice, Key> | null> => {
//   return prisma.invoice.findUnique({
//     where: { clientEmail },
//     select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
//   }) as Promise<Pick<Invoice, Key> | null>;
// };



/**
 * Update invoice by id
 * @param {ObjectId} invoiceId
 * @param {Object} updateBody
 * @returns {Promise<Invoice>}
 */
const updateInvoiceById = async <Key extends keyof Invoice>(
  invoiceId: number,
  updateBody: Prisma.InvoiceUpdateInput,
  keys: Key[] = ['id', 'talentId', 'agencyId', 'managerId', 'clientName', 'clientEmail', 'eventType', 'eventDate', 'billOption', 'fee', 'logisticInfo', 'logisticFee', 'TnC', 'totalFee'] as Key[]
): Promise<Pick<Invoice, Key> | null> => {
  const invoice = await getInvoiceById(invoiceId, ['id', 'talentId', 'agencyId', 'managerId', 'clientName', 'clientEmail', 'eventType', 'eventDate', 'billOption', 'fee', 'logisticInfo', 'logisticFee', 'TnC', 'totalFee']);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not found');
  }
  
  const updatedInvoice = await prisma.invoice.update({
    where: { id: invoice.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedInvoice as Pick<Invoice, Key> | null;
};

/**
 * Delete invoice by id
 * @param {ObjectId} invoiceId
 * @returns {Promise<Invoice>}
 */
const deleteInvoiceById = async (invoiceId: number): Promise<Invoice> => {
  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not found');
  }

 
  await prisma.invoice.delete({ where: { id: invoice.id } });
  return invoice;
};

export default {
  createInvoice,
  queryInvoices,
  getInvoiceById,
  //getInvoiceByClientEmail,
  updateInvoiceById,
  deleteInvoiceById
};
