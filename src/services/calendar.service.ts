import { Calendar, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';


/**
 * Create a calendar
 * @param {Object} calendarBody
 * @returns {Promise<Calendar>}
 */
const createCalendar = async (
  userId: number,
  eventTitle: string,
  description: string,
  eventVenue: string,
  eventCity: string,
  eventCountry: string,
  eventDate: Date,
  eventTime: Date
): Promise<Calendar> => {
  const user = await getCalendarByUserId(userId);
  if (user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User already have a Calendar');
  }
  return prisma.calendar.create({
    data: {
      userId,
      eventTitle,
      description,
      eventVenue,
      eventCity,
      eventCountry,
      eventDate,
      eventTime,
    }
  });
};


/**
 * Query for calendars
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCalendars = async <Key extends keyof Calendar>(
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
): Promise<Pick<Calendar, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const calendars = await prisma.calendar.findMany({
    // where: filter,
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    // skip: page * limit,
    // take: limit,
    // orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return calendars as Pick<Calendar, Key>[];
};

/**
 * Get calendar by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Calendar, Key> | null>}
 */
const getCalendarById = async <Key extends keyof Calendar>(
  id: number,
  keys: Key[] = [
    'id',
    'userId',
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
): Promise<Pick<Calendar, Key> | null> => {
  return prisma.calendar.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Calendar, Key> | null>;
};


/**
 * Get calendar by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Calendar, Key> | null>}
 */
const getCalendarByUserId = async <Key extends keyof Calendar>(
  userId: number,
  keys: Key[] = [
    'id',
    'userId',
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
): Promise<Pick<Calendar, Key> | null> => {
  return prisma.calendar.findUnique({
    where: { userId },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Calendar, Key> | null>;
};



/**
 * Update calendar by id
 * @param {ObjectId} calendarId
 * @param {Object} updateBody
 * @returns {Promise<Calendar>}
 */
const updateCalendarById = async <Key extends keyof Calendar>(
  calendarId: number,
  updateBody: Prisma.CalendarUpdateInput,
  keys: Key[] = ['id', 'userId', 'eventTitle', 'description', 'eventVenue', 'eventCity', 'eventCountry', 'eventDate', 'eventTime'] as Key[]
): Promise<Pick<Calendar, Key> | null> => {
  const user = await getCalendarById(calendarId, ['id', 'userId', 'eventTitle', 'description', 'eventVenue', 'eventCity', 'eventCountry', 'eventDate', 'eventTime']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar not found');
  }
  
  const updatedCalendar = await prisma.calendar.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedCalendar as Pick<Calendar, Key> | null;
};

/**
 * Delete calendar by id
 * @param {ObjectId} calendarId
 * @returns {Promise<Calendar>}
 */
const deleteCalendarById = async (userId: number): Promise<Calendar> => {
  const calendar = await getCalendarById(userId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar not found');
  }

 
  await prisma.calendar.delete({ where: { id: calendar.id } });
  return calendar;
};

export default {
  createCalendar,
  queryCalendars,
  getCalendarById,
  getCalendarByUserId,
  updateCalendarById,
  deleteCalendarById
};
