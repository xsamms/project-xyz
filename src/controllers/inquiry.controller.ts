import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { inquiryService } from '../services';

const createInquiry = catchAsync(async (req, res) => {
  const { talentId, agencyId, managerId, agencyManagerId, fullName, stageName, email, phoneNumber, type, subject, message, attachment, eventType, eventVenue, eventCity, eventCountry, eventDate, eventTime} = req.body;
  const inquiry = await inquiryService.createInquiry(talentId, agencyId, managerId, agencyManagerId, fullName, stageName, email, phoneNumber, type, subject, message, attachment, eventType, eventVenue, eventCity, eventCountry, eventDate, eventTime);
  res.status(httpStatus.CREATED).send(inquiry);
});

const getInquiries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await inquiryService.queryInquiries(filter, options);
  res.send(result);
});

const getInquiry = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.getInquiryById(req.params.inquiryId);
  if (!inquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
  }
  res.send(inquiry);
});

const updateInquiry = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.updateInquiryById(req.params.inquiryId, req.body);
  res.send(inquiry);
});

const deleteInquiry = catchAsync(async (req, res) => {
  await inquiryService.deleteInquiryById(req.params.inquiryId);
  res.status(httpStatus.NO_CONTENT).send({message: "Inquiry deleted successfully"});
});

export default {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry
};
