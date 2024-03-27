import express from 'express';
import calendar from '../middlewares/calendar';
import auth from '../middlewares/auth';
import validate from '../middlewares/validate';
import { calendarValidation } from '../validations';
import { calendarController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .post(calendar(), validate(calendarValidation.createCalendar), calendarController.createCalendar)
  .get(calendar('getUsers'), validate(calendarValidation.getCalendars), calendarController.getCalendars);

router
  .route('/:calendarId')
  .get(calendar('getUsers'), validate(calendarValidation.getCalendar), calendarController.getCalendar)
  .patch(calendar('manageUsers'), validate(calendarValidation.updateCalendar), calendarController.updateCalendar)
  .delete(calendar('manageUsers'), validate(calendarValidation.deleteCalendar), calendarController.deleteCalendar);

router
  .route('/user/:userId')
  .get(auth('getUsers'), validate(calendarValidation.getCalendarByUserId), calendarController.getCalendarByUserId)
export default router;

/**
 * @swagger
 * tags:
 *   name: Calendar
 *   description: Calendar management and retrieval
 */

/**
 * @swagger
 * /calendar:
 *   post:
 *     summary: Create a calendar
 *     description: Create calendar.
 *     tags: [Calendar]
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
 *               eventTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               eventVenue:
 *                  type: string
 *               eventCity:
 *                  type: string
 *               eventCountry:
 *                  type: string
 *               eventDate:
 *                  type: date
 *               eventTime:
 *                  type: datetime
 *             example:
 *               id: 1
 *               userId: 2
 *               eventTitle: "Lorem Ipsum"
 *               description: "Lorem Ipsum Lurem Lurem"
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
 *                $ref: '#/components/schemas/Calendar'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all calendars
 *     description: Retrieve all calendars.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Calendar name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Calendar role
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
 *         description: Maximum number of calendars
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
 *                     $ref: '#/components/schemas/Calendar'
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
 * /calendar/{calendarId}:
 *   get:
 *     summary: Get a calendar
 *     description: Fetch a calendar by id.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: calendarId
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Calendar'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a calendar
 *     description: Logged in users can only update their own calendars. Only admins can update other calendars.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: calendarId
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               eventTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               eventVenue:
 *                  type: string
 *               eventCity:
 *                  type: string
 *               eventCountry:
 *                  type: string
 *               eventDate:
 *                  type: date
 *               eventTime:
 *                  type: datetime
 *             example:
 *               id: 1
 *               userId: 2
 *               eventTitle: "Lorem Ipsum"
 *               description: "Lorem Ipsum Lurem Lurem"
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
 *                $ref: '#/components/schemas/Calendar'
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
 *     summary: Delete a calendar
 *     description: Logged in users can delete only their own calendars. Only admins can delete other calendars.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: calendarId
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar id
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

/**
 * @swagger
 * /calendar/user{userId}:
 *   get:
 *     summary: Get calendar by userId
 *     description: Fetch all calendar by userId.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Calendar'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */