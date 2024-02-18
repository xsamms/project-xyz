import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { managerService } from '../services';

const createManager = catchAsync(async (req, res) => {
  const { agencyName, regNumber, industry, address, state, country, userId} = req.body;
  const manager = await managerService.createManager(agencyName, regNumber, industry, address, state, country, userId);
  res.status(httpStatus.CREATED).send(manager);
});

const getManagers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['agencyName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await managerService.queryManagers(filter, options);
  res.send(result);
});

const getManager = catchAsync(async (req, res) => {
  const manager = await managerService.getManagerById(req.params.managerId);
  if (!manager) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manager not found');
  }
  res.send(manager);
});

const updateManager = catchAsync(async (req, res) => {
  const manager = await managerService.updateManagerById(req.params.managerId, req.body);
  res.send(manager);
});

const deleteManager = catchAsync(async (req, res) => {
  await managerService.deleteManagerById(req.params.managerId);
  res.status(httpStatus.NO_CONTENT).send({message: "Manager deleted successfully"});
});

export default {
  createManager,
  getManagers,
  getManager,
  updateManager,
  deleteManager
};
