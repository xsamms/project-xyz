import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { agencyService } from '../services';

const createAgency = catchAsync(async (req, res) => {
  const { agencyName, regNumber, industry, address, state, country, userId } = req.body;
  const agency = await agencyService.createAgency(agencyName, regNumber, industry, address, state, country, userId);
  res.status(httpStatus.CREATED).send(agency);
});

const getAgencies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['agencyName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await agencyService.queryAgencies(filter, options);
  res.send(result);
});

const getAgency = catchAsync(async (req, res) => {
  const agency = await agencyService.getAgencyById(req.params.agencyId);
  if (!agency) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agency not found');
  }
  res.send(agency);
});

const updateAgency = catchAsync(async (req, res) => {
  const agency = await agencyService.updateAgencyById(req.params.agencyId, req.body);
  res.send(agency);
});

const deleteAgency = catchAsync(async (req, res) => {
  await agencyService.deleteAgencyById(req.params.agencyId);
  res.status(httpStatus.NO_CONTENT).send({message: "Agency deleted successfully"});
});

export default {
  createAgency,
  getAgencies,
  getAgency,
  updateAgency,
  deleteAgency
};
