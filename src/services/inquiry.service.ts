import { Inquiry, InquiryType, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import { encryptPassword } from '../utils/encryption';

/**
 * Create a inquiry
 * @param {Object} inquiryBody
 * @returns {Promise<Inquiry>}
 */
const createInquiry = async (
    userId: number,
    talentId: number,
    agencyId: number,
    managerId: number,
    agencyManagerId: number,
    fullName: string,
    stageName: string,
    email: string,
    phoneNumber: string,
    type: InquiryType,
    subject: string,
    message: string,
    attachment: string[],
    eventType: string,
    eventVenue: string,
    eventCity: string,
    eventCountry: string,
    eventDate: Date,
    eventTime: Date
): Promise<Inquiry> => {
  if (await getInquiryByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return prisma.inquiry.create({
    data: {
        userId,
        talentId,
        agencyId,
        managerId,
        agencyManagerId,
        fullName,
        stageName,
        email,
        phoneNumber,
        type,
        subject,
        message,
        attachment,
        eventType,
        eventVenue,
        eventCity,
        eventCountry,
        eventDate,
        eventTime
    }
  });
};


/**
 * Query for inquiries
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInquiries = async <Key extends keyof Inquiry>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'userId',
    'talentId',
    'agencyId',
    'managerId',
    'agencyManagerId',
    'fullName',
    'stageName',
    'email',
    'phoneNumber',
    'type',
    'subject',
    'message',
    'attachment',
    'eventVenue',
    'eventCity',
    'eventCountry',
    'eventDate',
    'eventTime',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Inquiry, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const inquirys = await prisma.inquiry.findMany({
    // where: filter,
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    // skip: page * limit,
    // take: limit,
    // orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return inquirys as Pick<Inquiry, Key>[];
};

/**
 * Get inquiry by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Inquiry, Key> | null>}
 */
const getInquiryById = async <Key extends keyof Inquiry>(
  id: number,
  keys: Key[] = [
    'id',
    'userId',
    'talentId',
    'agencyId',
    'managerId',
    'agencyManagerId',
    'fullName',
    'stageName',
    'email',
    'phoneNumber',
    'type',
    'subject',
    'message',
    'attachment',
    'eventVenue',
    'eventCity',
    'eventCountry',
    'eventDate',
    'eventTime',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Inquiry, Key> | null> => {
  return prisma.inquiry.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Inquiry, Key> | null>;
};

/**
 * Get inquiry by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Inquiry, Key> | null>}
 */
const getInquiryByEmail = async <Key extends keyof Inquiry>(
  email: string,
  keys: Key[] = [
    'id',
    'userId',
    'talentId',
    'agencyId',
    'managerId',
    'agencyManagerId',
    'fullName',
    'stageName',
    'email',
    'phoneNumber',
    'type',
    'subject',
    'message',
    'attachment',
    'eventVenue',
    'eventCity',
    'eventCountry',
    'eventDate',
    'eventTime',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Inquiry, Key> | null> => {
  return prisma.inquiry.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Inquiry, Key> | null>;
};



/**
 * Update inquiry by id
 * @param {ObjectId} inquiryId
 * @param {Object} updateBody
 * @returns {Promise<Inquiry>}
 */
const updateInquiryById = async <Key extends keyof Inquiry>(
  inquiryId: number,
  updateBody: Prisma.InquiryUpdateInput,
  keys: Key[] = ['id', 'userId', 'talentId', 'agencyId', 'managerId', 'agencyManagerId', 'fullName', 'stageName', 'email', 'phoneNumber', 'type', 'subject', 'message', 'attachment', 'eventVenue', 'eventCity', 'eventCountry', 'eventDate', 'eventTime'] as Key[]
): Promise<Pick<Inquiry, Key> | null> => {
  const inquiry = await getInquiryById(inquiryId, ['id', 'userId', 'talentId', 'agencyId', 'managerId', 'agencyManagerId', 'fullName', 'stageName', 'email', 'phoneNumber', 'type', 'subject', 'message', 'attachment', 'eventVenue', 'eventCity', 'eventCountry', 'eventDate', 'eventTime']);
  if (!inquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
  }
  
  const updatedInquiry = await prisma.inquiry.update({
    where: { id: inquiry.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedInquiry as Pick<Inquiry, Key> | null;
};

/**
 * Delete inquiry by id
 * @param {ObjectId} inquiryId
 * @returns {Promise<Inquiry>}
 */
const deleteInquiryById = async (inquiryId: number): Promise<Inquiry> => {
  const inquiry = await getInquiryById(inquiryId);
  if (!inquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
  }

 
  await prisma.inquiry.delete({ where: { id: inquiry.id } });
  return inquiry;
};

export default {
  createInquiry,
  queryInquiries,
  getInquiryById,
  getInquiryByEmail,
  updateInquiryById,
  deleteInquiryById
};
