import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { agencyManagerService } from '../services';

const createAgencyManager = catchAsync(async (req, res) => {
  const { userId, agencyId, gender } = req.body;
  const agencyManger = await agencyManagerService.createAgencyManager(userId, agencyId, gender);
  res.status(httpStatus.CREATED).send(agencyManger);
});

const getAgencyManagers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['agencyMangerName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await agencyManagerService.queryAgencyManagers(filter, options);
  res.send(result);
});

const getAgencyManager = catchAsync(async (req, res) => {
  const agencyManger = await agencyManagerService.getAgencyManagerById(req.params.agencyManagerId);
  if (!agencyManger) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AgencyManger not found');
  }
  res.send(agencyManger);
});

const updateAgencyManager = catchAsync(async (req, res) => {
  const agencyManger = await agencyManagerService.updateAgencyManagerById(req.params.agencyManagerId, req.body);
  res.send(agencyManger);
});

const deleteAgencyManager = catchAsync(async (req, res) => {
  await agencyManagerService.deleteAgencyManagerById(req.params.agencyManagerId);
  res.status(httpStatus.NO_CONTENT).send({message: "AgencyManger deleted successfully"});
});

export default {
  createAgencyManager,
  getAgencyManagers,
  getAgencyManager,
  updateAgencyManager,
  deleteAgencyManager
};
