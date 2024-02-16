import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService, agencyService, managerService } from '../services';
import exclude from '../utils/exclude';
import { User } from '@prisma/client';
import { error } from 'console';
import passport from 'passport';

const registerAsAgency = catchAsync(async (req, res) => {
  const { email, password, fullName, mobileNumber, verificationType, agencyName, regNumber, industry, address, state, country } = req.body;
  const user = await userService.createUser(email, password, fullName, mobileNumber, verificationType);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  const agency = await agencyService.createAgency(user.id, agencyName, regNumber, industry, address, state, country)
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens, agency });
});

const registerAsManager = catchAsync(async (req, res) => {
  const { email, password, fullName, mobileNumber, verificationType, agencyName, regNumber, industry, address, state, country, agencyId } = req.body;
  const user = await userService.createUser(email, password, fullName, mobileNumber, verificationType);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  const manager = await managerService.createManager(user.id, agencyId, agencyName, regNumber, industry, address, state, country)
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens, manager });
});


const loginWithEmail = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});


const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token as string, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const user = req.user as User;
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email ? user.email : "", verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token as string);
  res.status(httpStatus.NO_CONTENT).send();
});

const createOTP = catchAsync(async (req, res) => {
  await authService.createOTP(req.body, (error: any, result: any) => {
    if(error) return error;

    return res.status(200).send({
      message: "Success",
      data: result
    })
  })
});

const verifyOTP = catchAsync(async (req, res) => {
  await authService.verifyOTP(req.body, (error: any, result: any) => {
    if(error) return error;

    return res.status(200).send({
      message: "Success",
      data: result
    })
  })
});


export default {
  registerAsAgency,
  registerAsManager,
  loginWithEmail,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  createOTP,
  verifyOTP
};
