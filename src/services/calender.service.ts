import { Calender, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';


/**
 * Create a calender
 * @param {Object} calenderBody
 * @returns {Promise<Calender>}
 */
const createCalender = async (
  talentId: number,
  agencyId: number,
  managerId: number,
  agencyManagerId: number,
  eventTitle: string,
  description: string,
  eventVenue: string,
  eventCity: string,
  eventCountry: string,
  eventDate: Date,
  eventTime: Date
): Promise<Calender> => {
  
  return prisma.calender.create({
    data: {
      talentId,
      agencyId,
      managerId,
      agencyManagerId,
      eventTitle,
      description,
      eventVenue,
      eventCity,
      eventCountry,
      eventDate,
      eventTime
    }
  });
};


/**
 * Query for calenders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCalenders = async <Key extends keyof Calender>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'agencyId',
    'managerId',
    'eventTitle',
    'description',
    'eventVenue',
    'eventCity',
    'eventCountry',
    'eventDate',
    'eventTime',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Calender, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const calenders = await prisma.calender.findMany({
    // where: filter,
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    // skip: page * limit,
    // take: limit,
    // orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return calenders as Pick<Calender, Key>[];
};

/**
 * Get calender by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Calender, Key> | null>}
 */
const getCalenderById = async <Key extends keyof Calender>(
  id: number,
  keys: Key[] = [
    'id',
    'agencyId',
    'managerId',
    'eventTitle',
    'description',
    'eventVenue',
    'eventCity',
    'eventCountry',
    'eventDate',
    'eventTime',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Calender, Key> | null> => {
  return prisma.calender.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Calender, Key> | null>;
};



/**
 * Update calender by id
 * @param {ObjectId} calenderId
 * @param {Object} updateBody
 * @returns {Promise<Calender>}
 */
const updateCalenderById = async <Key extends keyof Calender>(
  calenderId: number,
  updateBody: Prisma.CalenderUpdateInput,
  keys: Key[] = ['id', 'agencyId', 'managerId', 'agencyManagerId', 'eventTitle', 'description', 'eventVenue', 'eventCity', 'eventCountry', 'eventDate', 'eventTime'] as Key[]
): Promise<Pick<Calender, Key> | null> => {
  const user = await getCalenderById(calenderId, ['id','agencyId', 'managerId', 'agencyManagerId', 'eventTitle', 'description', 'eventVenue', 'eventCity', 'eventCountry', 'eventDate', 'eventTime']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calender not found');
  }
  
  const updatedCalender = await prisma.calender.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedCalender as Pick<Calender, Key> | null;
};

/**
 * Delete calender by id
 * @param {ObjectId} calenderId
 * @returns {Promise<Calender>}
 */
const deleteCalenderById = async (userId: number): Promise<Calender> => {
  const calender = await getCalenderById(userId);
  if (!calender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calender not found');
  }

 
  await prisma.calender.delete({ where: { id: calender.id } });
  return calender;
};

export default {
  createCalender,
  queryCalenders,
  getCalenderById,
  updateCalenderById,
  deleteCalenderById
};
