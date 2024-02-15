import httpStatus from 'http-status';
import tokenService from './token.service';
import userService from './user.service';
import ApiError from '../utils/ApiError';
import { TokenType, User } from '@prisma/client';
import prisma from '../client';
import { encryptPassword, isPasswordMatch } from '../utils/encryption';
import { AuthTokensResponse } from '../types/response';
import exclude from '../utils/exclude';
import otpGenerator  from 'otp-generator';
import crypto from 'crypto';
import config from '../config/config';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  const user = await userService.getUserByEmail(email, [
    'id',
    'email',
    'name',
    'telephone',
    'password',
    'role',
    'isEmailVerified',
    'isPhoneVerified',
    'createdAt',
    'updatedAt'
  ]);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return exclude(user, ['password']);
};


/**
 * Login with username and password
 * @param {string} telephone
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const loginUserWithPhoneAndPassword = async (
  telephone: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  const user = await userService.getUserByPhone(telephone, [
    'id',
    'email',
    'name',
    'telephone',
    'password',
    'role',
    'isEmailVerified',
    'isPhoneVerified',
    'createdAt',
    'updatedAt'
  ]);
  if (!user || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect telephone or password');
  }
  return exclude(user, ['password']);
};


/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false
    }
  });
  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await prisma.token.delete({ where: { id: refreshTokenData.id } });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshAuth = async (refreshToken: string): Promise<AuthTokensResponse> => {
  try {
    const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
    const { userId } = refreshTokenData;
    await prisma.token.delete({ where: { id: refreshTokenData.id } });
    return tokenService.generateAuthTokens({ id: userId });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
  try {
    const resetPasswordTokenData = await tokenService.verifyToken(
      resetPasswordToken,
      TokenType.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenData.userId);
    if (!user) {
      throw new Error();
    }
    const encryptedPassword = await encryptPassword(newPassword);
    await userService.updateUserById(user.id, { password: encryptedPassword });
    await prisma.token.deleteMany({ where: { userId: user.id, type: TokenType.RESET_PASSWORD } });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<void>}
 */
const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
  try {
    const verifyEmailTokenData = await tokenService.verifyToken(
      verifyEmailToken,
      TokenType.VERIFY_EMAIL
    );
    await prisma.token.deleteMany({
      where: { userId: verifyEmailTokenData.userId, type: TokenType.VERIFY_EMAIL }
    });
    await userService.updateUserById(verifyEmailTokenData.userId, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * createOTP
 * @param {string} telephone
 * @returns {Promise<void>}
 */
const createOTP = (params: any, callback: any): Promise<void> => {
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false
  });

  const ttl = 3 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${params.telephone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", config.OTP_KEY).update(data).digest('hex');
  const fillHash = `${hash}.${expires}`;

  console.log(`Your OTP is ${otp}`);

  return callback(null, fillHash);
}

/**
 * verifyOTP
 * @param {string} telephone
 * @param {string} otp
 * @returns {Promise<void>}
 */
const verifyOTP = (params: any, callback: any) => {
  const [hashValue, expires] = params.hash.split('.');

  let now = Date.now();
  if(now > parseInt(expires)) return callback("OTP Expired");

  let data =`${params.telephone}.${params.otp}.${expires}`;
  let newHash = crypto.createHmac("sha256", config.OTP_KEY).update(data).digest('hex');

  if(newHash === hashValue){
    return callback(null, "Success");
  }

  return callback(null, "Invalid OTP");
}

export default {
  loginUserWithEmailAndPassword,
  loginUserWithPhoneAndPassword,
  isPasswordMatch,
  encryptPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  createOTP,
  verifyOTP
};
