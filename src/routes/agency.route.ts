import express from 'express';
import agency from '../middlewares/agency';
import validate from '../middlewares/validate';
import { agencyValidation } from '../validations';
import { agencyController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .post(agency('manageAgencies'), validate(agencyValidation.createAgency), agencyController.createAgency)
  .get(agency('getAgencies'), validate(agencyValidation.getAgencies), agencyController.getAgencies);

router
  .route('/:agencyId')
  .get(agency('getAgencies'), validate(agencyValidation.getAgency), agencyController.getAgency)
  .patch(agency('manageAgencies'), validate(agencyValidation.updateAgency), agencyController.updateAgency)
  .delete(agency('manageAgencies'), validate(agencyValidation.deleteAgency), agencyController.deleteAgency);

export default router;

/**
 * @swagger
 * tags:
 *   name: Agency
 *   description: Agency management and retrieval
 */

/**
 * @swagger
 * /agency:
 *   post:
 *     summary: Create agency
 *     description: Create an agency.
 *     tags: [Agency]
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
 *                 type: number
 *               agencyName:
 *                 type: string
 *               regNumber:
 *                 type: number
 *               industry:
 *                 type: string
 *               address:
 *                  type: string
 *               state:
 *                  type: string
 *               country:
 *                  type: string
 *             example:
 *               userId: 2
 *               agencyName: Pub Music
 *               regNumber: BN837912
 *               industry: Music
 *               address: 12, Isaac John Str, GRA, Ikeja
 *               state: Lagos
 *               country: Nigeria
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Agency'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all agencies
 *     description: Retrieve all agencies.
 *     tags: [Agency]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: agencyName
 *         schema:
 *           type: string
 *         description: Agency name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Agency role
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
 *         description: Maximum number of agencies
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
 *                     $ref: '#/components/schemas/Agency'
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
 * /agency/{id}:
 *   get:
 *     summary: Get an agency
 *     description: Fetch an agency by id.
 *     tags: [Agency]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agency id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Agency'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an agency
 *     description: Logged in agencies can only update their own information. Only admins can update other agencies.
 *     tags: [Agency]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agency id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
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
 *               id: 1
 *               userId: 2
 *               agencyName: "Platazion Inc."
 *               regNumber: "BN20381900"
 *               industry: "Entertainment"
 *               address: "12, Isaac John Str, GRA, Ikeja"
 *               state: "Lagos"
 *               country: "Nigeria"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Agency'
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
 *     summary: Delete an agency
 *     description: Logged in agencies can delete only themselves. Only admins can delete other agencies.
 *     tags: [Agency]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agency id
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
