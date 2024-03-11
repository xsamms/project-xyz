import express from 'express';
import manager from '../middlewares/manager';
import validate from '../middlewares/validate';
import { managerValidation } from '../validations';
import { managerController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .post(manager('manageManagers'), validate(managerValidation.createManager), managerController.createManager)
  .get(manager('getManagers'), validate(managerValidation.getManagers), managerController.getManagers);

router
  .route('/:managerId')
  .get(manager('getManagers'), validate(managerValidation.getManager), managerController.getManager)
  .patch(manager('manageManagers'), validate(managerValidation.updateManager), managerController.updateManager)
  .delete(manager('manageManagers'), validate(managerValidation.deleteManager), managerController.deleteManager);

export default router;

/**
 * @swagger
 * tags:
 *   name: Manager
 *   description: Manager management and retrieval
 */

/**
 * @swagger
 * /manager:
 *   post:
 *     summary: Create Manager
 *     description: Create a Manager.
 *     tags: [Manager]
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
 *                $ref: '#/components/schemas/Manager'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all managers
 *     description: Retrieve all managers.
 *     tags: [Manager]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: agencyName
 *         schema:
 *           type: string
 *         description: Manager name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Manager role
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
 *         description: Maximum number of managers
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
 *                     $ref: '#/components/schemas/Manager'
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
 * /manager/{id}:
 *   get:
 *     summary: Get a manager
 *     description: Fetch a manager by id.
 *     tags: [Manager]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Manager id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Manager'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a manager
 *     description: Logged in managers can only update their own information. Only admins can update other managers.
 *     tags: [Manager]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Manager id
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
 *                $ref: '#/components/schemas/Manager'
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
 *     summary: Delete a manager
 *     description: Logged in managers can delete only themselves. Only admins can delete other managers.
 *     tags: [Manager]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Manager id
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
