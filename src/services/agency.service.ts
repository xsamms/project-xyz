import { Agency, Role, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';


/**
 * Create agency
 * @param {Object} agencyBody
 * @returns {Promise<Agency>}
 */
const createAgency = async (
    userId: number,
    agencyName: string,
    regNumber: number,
    industry?: string,
    address?: string,
    state?: string,
    country?: string
): Promise<Agency> => {
  return prisma.agency.create({
    data: {
      userId,
      agencyName,
      regNumber,
      industry,
      address,
      state,
      country
    }
  });
};



/**
 * Query for agencies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAgencies = async <Key extends keyof Agency>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'agencyName',
    'regNumber',
    'industry',
    'address',
    'state',
    'country',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Agency, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const agencies = await prisma.agency.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return agencies as Pick<Agency, Key>[];
};

/**
 * Get agency by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Agency, Key> | null>}
 */
const getAgencyById = async <Key extends keyof Agency>(
  id: number,
  keys: Key[] = [
    'id',
    'agencyName',
    'regNumber',
    'industry',
    'address',
    'state',
    'country',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Agency, Key> | null> => {
  return prisma.agency.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Agency, Key> | null>;
};



/**
 * Update user by id
 * @param {ObjectId} agencyId
 * @param {Object} updateBody
 * @returns {Promise<Agency>}
 */
const updateAgencyById = async <Key extends keyof Agency>(
  agencyId: number,
  updateBody: Prisma.AgencyUpdateInput,
  keys: Key[] = ['id', 'agencyName', 'regNumber', 'industry', 'address', 'state', 'country'] as Key[]
): Promise<Pick<Agency, Key> | null> => {
  const agency = await getAgencyById(agencyId, ['id', 'agencyName', 'regNumber', 'industry', 'address', 'state', 'country']);
  if (!agency) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agency not found');
  }
  
  const updatedUser = await prisma.agency.update({
    where: { id: agency.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<Agency, Key> | null;
};

/**
 * Delete agency by id
 * @param {ObjectId} userId
 * @returns {Promise<Agency>}
 */
const deleteAgencyById = async (agencyId: number): Promise<Agency> => {
  const agency = await getAgencyById(agencyId);
  if (!agency) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agency not found');
  }
  
  await prisma.agency.delete({ where: { id: agency.id } });
  return agency;
};

export default {
  createAgency,
  queryAgencies,
  getAgencyById,
  updateAgencyById,
  deleteAgencyById
};
