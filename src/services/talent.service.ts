import { Talent, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';


/**
 * Create a talent
 * @param {Object} talentBody
 * @returns {Promise<Talent>}
 */
const createTalent = async (
  userId: number,
  agencyId: number,
  managerId: number,
  agencyManagerId: number,
  stageName: string,
  industry: string,
  bookingPrice: number
): Promise<Talent> => {
  
  return prisma.talent.create({
    data: {
      userId,
      agencyId,
      managerId,
      agencyManagerId,
      stageName,
      industry,
      bookingPrice
    }
  });
};


/**
 * Query for talents
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTalents = async <Key extends keyof Talent>(
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
    'agencyId',
    'managerId',
    'stageName',
    'industry',
    'bookingPrice',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Talent, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const talents = await prisma.talent.findMany({
    // where: filter,
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    // skip: page * limit,
    // take: limit,
    // orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return talents as Pick<Talent, Key>[];
};

/**
 * Get talent by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Talent, Key> | null>}
 */
const getTalentById = async <Key extends keyof Talent>(
  id: number,
  keys: Key[] = [
    'id',
    'userId',
    'agencyId',
    'managerId',
    'stageName',
    'industry',
    'bookingPrice',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Talent, Key> | null> => {
  return prisma.talent.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Talent, Key> | null>;
};



/**
 * Update talent by id
 * @param {ObjectId} talentId
 * @param {Object} updateBody
 * @returns {Promise<Talent>}
 */
const updateTalentById = async <Key extends keyof Talent>(
  talentId: number,
  updateBody: Prisma.TalentUpdateInput,
  keys: Key[] = ['id', 'userId', 'agencyId', 'managerId', 'stageName', 'industry', 'bookingPrice'] as Key[]
): Promise<Pick<Talent, Key> | null> => {
  const user = await getTalentById(talentId, ['id', 'userId', 'agencyId', 'managerId', 'stageName', 'industry', 'bookingPrice']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Talent not found');
  }
  
  const updatedTalent = await prisma.talent.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedTalent as Pick<Talent, Key> | null;
};

/**
 * Delete talent by id
 * @param {ObjectId} talentId
 * @returns {Promise<Talent>}
 */
const deleteTalentById = async (userId: number): Promise<Talent> => {
  const talent = await getTalentById(userId);
  if (!talent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Talent not found');
  }

 
  await prisma.talent.delete({ where: { id: talent.id } });
  return talent;
};

export default {
  createTalent,
  queryTalents,
  getTalentById,
  updateTalentById,
  deleteTalentById
};
