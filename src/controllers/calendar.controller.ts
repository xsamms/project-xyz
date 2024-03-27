import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { calendarService } from '../services';

const createCalendar = catchAsync(async (req, res) => {
  const {  userId, eventTitle, description, eventVenue, eventCity, eventCountry, eventDate, eventTime } = req.body;
  const calendar = await calendarService.createCalendar( userId, eventTitle, description, eventVenue, eventCity, eventCountry, eventDate, eventTime);
  res.status(httpStatus.CREATED).send(calendar);
});

const getCalendars = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['stageName']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await calendarService.queryCalendars(filter, options);
  res.send(result);
});

const getCalendar = catchAsync(async (req, res) => {
  const calendar = await calendarService.getCalendarById(req.params.calendarId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar not found');
  }
  res.send(calendar);
});


const getCalendarByUserId = catchAsync(async (req, res) => {
  const calendar = await calendarService.getCalendarByUserId(req.params.userId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar not found');
  }
  res.send(calendar);
});

const updateCalendar = catchAsync(async (req, res) => {
  const calendar = await calendarService.updateCalendarById(req.params.calendarId, req.body);
  res.send(calendar);
});

const deleteCalendar = catchAsync(async (req, res) => {
  await calendarService.deleteCalendarById(req.params.calendarId);
  res.status(httpStatus.NO_CONTENT).send({message: "Calendar deleted successfully"});
});

export default {
  createCalendar,
  getCalendars,
  getCalendar,
  getCalendarByUserId,
  updateCalendar,
  deleteCalendar
};
