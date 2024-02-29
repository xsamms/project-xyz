import { AgencyManager, Role, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';


/**
 * Create agencyManager
 * @param {Object} agencyManagerBody
 * @returns {Promise<AgencyManager>}
 */
const createAgencyManager = async (
    userId: number,
    agencyId: number,
    gender: string
): Promise<AgencyManager> => {
  return prisma.agencyManager.create({
    data: {
      userId,
      agencyId,
      gender
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
const queryAgencyManagers = async <Key extends keyof AgencyManager>(
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
    'userId',
    'gender',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<AgencyManager, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const agencies = await prisma.agencyManager.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return agencies as Pick<AgencyManager, Key>[];
};

/**
 * Get agencyManager by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<AgencyManager, Key> | null>}
 */
const getAgencyManagerById = async <Key extends keyof AgencyManager>(
  id: number,
  keys: Key[] = [
    'id',
    'agencyId',
    'userId',
    'gender',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<AgencyManager, Key> | null> => {
  return prisma.agencyManager.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<AgencyManager, Key> | null>;
};



/**
 * Update user by id
 * @param {ObjectId} agencyManagerId
 * @param {Object} updateBody
 * @returns {Promise<AgencyManager>}
 */
const updateAgencyManagerById = async <Key extends keyof AgencyManager>(
  agencyManagerId: number,
  updateBody: Prisma.AgencyManagerUpdateInput,
  keys: Key[] = ['id', 'agencyId', 'userId', 'gender'] as Key[]
): Promise<Pick<AgencyManager, Key> | null> => {
  const agencyManager = await getAgencyManagerById(agencyManagerId, ['id', 'agencyId', 'userId', 'gender']);
  if (!agencyManager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AgencyManager not found');
  }
  
  const updatedAgencyManager = await prisma.agencyManager.update({
    where: { id: agencyManager.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedAgencyManager as Pick<AgencyManager, Key> | null;
};

/**
 * Delete agencyManager by id
 * @param {ObjectId} AgencyManagerId
 * @returns {Promise<AgencyManager>}
 */
const deleteAgencyManagerById = async (agencyManagerId: number): Promise<AgencyManager> => {
  const agencyManager = await getAgencyManagerById(agencyManagerId);
  if (!agencyManager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AgencyManager not found');
  }
  
  await prisma.agencyManager.delete({ where: { id: agencyManager.id } });
  return agencyManager;
};

export default {
  createAgencyManager,
  queryAgencyManagers,
  getAgencyManagerById,
  updateAgencyManagerById,
  deleteAgencyManagerById
};
