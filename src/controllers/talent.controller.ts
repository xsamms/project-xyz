import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { talentService } from '../services';

const createTalent = catchAsync(async (req, res) => {
  const { userId, agencyId, managerId, agencyManagerId, stageName, industry, bookingPrice } = req.body;
  const talent = await talentService.createTalent(userId, agencyId, managerId, agencyManagerId, stageName, industry, bookingPrice);
  res.status(httpStatus.CREATED).send(talent);
});

const getTalents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['stageName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await talentService.queryTalents(filter, options);
  res.send(result);
});

const getTalent = catchAsync(async (req, res) => {
  const talent = await talentService.getTalentById(req.params.talentId);
  if (!talent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Talent not found');
  }
  res.send(talent);
});

const updateTalent = catchAsync(async (req, res) => {
  const talent = await talentService.updateTalentById(req.params.talentId, req.body);
  res.send(talent);
});

const deleteTalent = catchAsync(async (req, res) => {
  await talentService.deleteTalentById(req.params.talentId);
  res.status(httpStatus.NO_CONTENT).send({message: "Talent deleted successfully"});
});

export default {
  createTalent,
  getTalents,
  getTalent,
  updateTalent,
  deleteTalent
};
