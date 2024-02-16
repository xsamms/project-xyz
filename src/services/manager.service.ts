import { Manager, Role, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';


/**
 * Create manager
 * @param {Object} managerBody
 * @returns {Promise<Manager>}
 */
const createManager = async (
    userId: number,
    agencyId: number,
    agencyName: string,
    regNumber: string,
    industry: string,
    address: string,
    state: string,
    country: string
): Promise<Manager> => {
  return prisma.manager.create({
    data: {
      userId,
      agencyId,
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
const queryManagers = async <Key extends keyof Manager>(
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
    'userId',
    'agencyId',
    'regNumber',
    'industry',
    'address',
    'state',
    'country',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Manager, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const agencies = await prisma.manager.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return agencies as Pick<Manager, Key>[];
};

/**
 * Get manager by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Manager, Key> | null>}
 */
const getManagerById = async <Key extends keyof Manager>(
  id: number,
  keys: Key[] = [
    'id',
    'agencyName',
    'userId',
    'agencyId',
    'regNumber',
    'industry',
    'address',
    'state',
    'country',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Manager, Key> | null> => {
  return prisma.manager.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Manager, Key> | null>;
};



/**
 * Update user by id
 * @param {ObjectId} managerId
 * @param {Object} updateBody
 * @returns {Promise<Manager>}
 */
const updateManagerById = async <Key extends keyof Manager>(
  managerId: number,
  updateBody: Prisma.ManagerUpdateInput,
  keys: Key[] = ['id', 'agencyName', 'regNumber', 'industry', 'address', 'state', 'country', 'userId', 'agencyId'] as Key[]
): Promise<Pick<Manager, Key> | null> => {
  const manager = await getManagerById(managerId, ['id', 'agencyName', 'regNumber', 'industry', 'address', 'state', 'country', 'userId', 'agencyId']);
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found');
  }
  
  const updatedUser = await prisma.manager.update({
    where: { id: manager.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<Manager, Key> | null;
};

/**
 * Delete manager by id
 * @param {ObjectId} userId
 * @returns {Promise<Manager>}
 */
const deleteManagerById = async (managerId: number): Promise<Manager> => {
  const manager = await getManagerById(managerId);
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found');
  }
  
  await prisma.manager.delete({ where: { id: manager.id } });
  return manager;
};

export default {
  createManager,
  queryManagers,
  getManagerById,
  updateManagerById,
  deleteManagerById
};
