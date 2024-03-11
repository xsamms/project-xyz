import express from 'express';
import validate from '../middlewares/validate';
import authValidation from '../validations/auth.validation';
import { authController } from '../controllers';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/register-as-agency', validate(authValidation.registerAsAgency), authController.registerAsAgency);
router.post('/register-as-manager', validate(authValidation.registerAsManager), authController.registerAsManager);
router.post('/register-as-talent', validate(authValidation.registerAsTalent), authController.registerAsTalent);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post(
  '/refresh-tokens',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.post('/create-otp', authController.createOTP);
router.post('/verify-otp', authController.verifyOTP);

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register-as-agency:
 *   post:
 *     summary: Register as an agency
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               fullName:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               role:
 *                 type: string
 *               verificationType:
 *                 type: string
 *               agencyName:
 *                 type: string
 *               regNumber:
 *                 type: string
 *               industry:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *             example:
 *               email: fake@example.com
 *               password: password1
 *               fullName: fake name
 *               mobileNumber: "08099999999"
 *               verificationType: "BVN"
 *               agencyName: "Platazion Inc."
 *               regNumber: "BN20381900"
 *               industry: "Entertainment"
 *               address: "12, Isaac John Str, GRA, Ikeja"
 *               state: "Lagos"
 *               country: "Nigeria"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *                 agency:
 *                   $ref: '#/components/schemas/Agency'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
* /auth/register-as-manager:
 *   post:
 *     summary: Register as a manager
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               fullName:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               verificationType:
 *                 type: string
 *               agencyName:
 *                 type: string
 *               regNumber:
 *                 type: string
 *               industry:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *             example:
 *               email: fake@example.com
 *               password: password1
 *               fullName: fake name
 *               mobileNumber: "08099999999"
 *               verificationType: "BVN"
 *               agencyName: "Platazion Inc."
 *               regNumber: "BN20381900"
 *               industry: "Entertainment"
 *               address: "12, Isaac John Str, GRA, Ikeja"
 *               state: "Lagos"
 *               country: "Nigeria"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *                 manager:
 *                   $ref: '#/components/schemas/Manager'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
* /auth/register-as-talent:
 *   post:
 *     summary: Register as a talent
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               fullName:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               verificationType:
 *                 type: string
 *               agencyId:
 *                 type: number
 *               managerId:
 *                 type: number
 *               agencyManagerId:
 *                 type: number
 *               stageName:
 *                 type: string
 *               industry:
 *                 type: string
 *               bookingPrice:
 *                 type: number
 *             example:
 *               email: fake@example.com
 *               password: password1
 *               fullName: fake name
 *               mobileNumber: "08099999999"
 *               verificationType: "BVN"
 *               agencyId: 1
 *               managerId: 2
 *               agencyManagerId: 3
 *               stageNamw: Gbaskolobo
 *               industry: "Entertainment"
 *               bookingPrice: 100000
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *                 talent:
 *                   $ref: '#/components/schemas/Talent'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or password
 */


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/refresh-tokens:
 *   post:
 *     summary: Refresh auth tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: An email will be sent to reset password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               email: fake@example.com
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               password: password1
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: Password reset failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Password reset failed
 */

/**
 * @swagger
 * /auth/send-verification-email:
 *   post:
 *     summary: Send verification email
 *     description: An email will be sent to verify email.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: verify email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verify email token
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: verify email failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: verify email failed
 */

/**
 * @swagger
 * /auth/create-otp:
 *   post:
 *     summary: Create OTP
 *     description: An OTP will be sent to your phone.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telephone
 *             properties:
 *               telephone:
 *                 type: string
 *             example:
 *               telephone: "+2340899771122"
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /auth/verify-OTP:
 *   post:
 *     summary: verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telephone
 *               - otp
 *               - hash
 *             properties:
 *               telephone:
 *                 type: string
 *               otp:
 *                 type: string
 *               hash:
 *                 type: string 
 *             example:
 *               telephone: "+2348077665544"
 *               otp: "4330"
 *               hash: "9a0b939d4ee65f48dd94d0beb96c3cc5eb618a56737748630979590dd4896298.1703195361140"
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: verify OTP failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: verify OTP failed
 */
