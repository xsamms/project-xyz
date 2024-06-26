import express from 'express';
import inquiry from '../middlewares/inquiry';
import validate from '../middlewares/validate';
import { inquiryValidation } from '../validations';
import { inquiryController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .post(inquiry(), validate(inquiryValidation.createInquiry), inquiryController.createInquiry)
  .get(inquiry('getUsers'), validate(inquiryValidation.getInquiries), inquiryController.getInquiries);

router
  .route('/:inquiryId')
  .get(inquiry('getUsers'), validate(inquiryValidation.getInquiry), inquiryController.getInquiry)
  .patch(inquiry('manageUsers'), validate(inquiryValidation.updateInquiry), inquiryController.updateInquiry)
  .delete(inquiry('manageUsers'), validate(inquiryValidation.deleteInquiry), inquiryController.deleteInquiry);

export default router;

/**
 * @swagger
 * tags:
 *   name: Inquiry
 *   description: Inquiry management and retrieval
 */

/**
 * @swagger
 * /inquiry:
 *   post:
 *     summary: Create inquiry
 *     description: Create inquiry.
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *               talentId:
 *                 type: string
 *               managerId:
 *                 type: string
 *               agencyId:
 *                 type: string
 *               agencyManagerId:
 *                 type: string
 *               fullName:
 *                 type: string
 *               stageName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               phoneNumber:
 *                 type: string
 *               type:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               attachment:
 *                 type: array
 *                 items:
 *                   type: string
 *               eventType:
 *                 type: string
 *               eventVenue:
 *                  type: string
 *               eventCity:
 *                  type: string
 *               eventCountry:
 *                  type: string
 *               eventDate:
 *                  type: datetime
 *               eventTime:
 *                  type: datetime
 *             example:
 *               id: 1
 *               userId: 2
 *               talentId: undefined
 *               managerId: undefined
 *               agencyId: 5
 *               agencyManagerId: undefined
 *               fullName: "John Doe"
 *               stageName: "JoeBoyDo"
 *               email: "joe@gmail.com"
 *               phoneNumber: "09088776655"
 *               type: "Booking"
 *               subject: "Music Concert"
 *               message: "We want you to perform in our Music Concert"
 *               attachment: ["file1", "file2"]
 *               eventType: "Concert"
 *               eventVenue: "Eko Hotel"
 *               eventCity: "Lagos"
 *               eventCountry: "Nigeria"
 *               eventDate: "2022-01-01"
 *               eventTime: "2022-01-01 12:00:00"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Inquiry'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all inquiries
 *     description: Retrieve all inquiries.
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Inquiry name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Inquiry role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of inquirys
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Inquiry'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /inquiry/{inquiryId}:
 *   get:
 *     summary: Get an inquiry
 *     description: Fetch an inquiry by id.
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inquiryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Inquiry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an inquiry
 *     description: Logged in users can only update their own inquiries. Only admins can update other inquiries.
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inquiryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               talentId:
 *                 type: string
 *               managerId:
 *                 type: string
 *               agencyId:
 *                 type: string
 *               agencyManagerId:
 *                 type: string
 *               fullName:
 *                 type: string
 *               stageName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               phoneNumber:
 *                 type: string
 *               type:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               attachment:
 *                 type: array
 *                 items:
 *                   type: string
 *               eventType:
 *                 type: string
 *               eventVenue:
 *                  type: string
 *               eventCity:
 *                  type: string
 *               eventCountry:
 *                  type: string
 *               eventDate:
 *                  type: datetime
 *               eventTime:
 *                  type: datetime
 *             example:
 *               id: 1
 *               userId: 2
 *               talentId: undefined
 *               managerId: undefined
 *               agencyId: 5
 *               agencyManagerId: undefined
 *               fullName: "John Doe"
 *               stageName: "JoeBoyDo"
 *               email: "joe@gmail.com"
 *               phoneNumber: "09088776655"
 *               type: "Booking"
 *               subject: "Music Concert"
 *               message: "We want you to perform in our Music Concert"
 *               attachment: ["file1", "file2"]
 *               eventType: "Concert"
 *               eventVenue: "Eko Hotel"
 *               eventCity: "Lagos"
 *               eventCountry: "Nigeria"
 *               eventDate: "2022-01-01"
 *               eventTime: "2022-01-01 12:00:00"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Inquiry'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an inquiry
 *     description: Logged in users can delete only their own inquiries. Only admins can delete other inquiries.
 *     tags: [Inquiry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
