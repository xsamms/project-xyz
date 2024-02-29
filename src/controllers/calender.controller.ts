import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import addCalender from '../utils/addCalender';
import { calenderService } from '../services';

const createCalender = catchAsync(async (req, res) => {
  const {  talentId, agencyId, managerId, agencyManagerId, eventTitle, description, eventVenue, eventCity, eventCountry, eventDate, eventTime } = req.body;
  const calender = await calenderService.createCalender(talentId, agencyId, managerId, agencyManagerId, eventTitle, description, eventVenue, eventCity, eventCountry, eventDate, eventTime);
  await addCalender(eventTitle, description, eventVenue, eventCity, eventCountry, eventDate, eventTime);
  res.status(httpStatus.CREATED).send(calender);
});

const getCalenders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['stageName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await calenderService.queryCalenders(filter, options);
  res.send(result);
});

const getCalender = catchAsync(async (req, res) => {
  const calender = await calenderService.getCalenderById(req.params.calenderId);
  if (!calender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calender not found');
  }
  res.send(calender);
});

const updateCalender = catchAsync(async (req, res) => {
  const calender = await calenderService.updateCalenderById(req.params.calenderId, req.body);
  res.send(calender);
});

const deleteCalender = catchAsync(async (req, res) => {
  await calenderService.deleteCalenderById(req.params.calenderId);
  res.status(httpStatus.NO_CONTENT).send({message: "Calender deleted successfully"});
});

export default {
  createCalender,
  getCalenders,
  getCalender,
  updateCalender,
  deleteCalender
};
