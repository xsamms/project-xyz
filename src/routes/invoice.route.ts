import express from 'express';
import invoice from '../middlewares/invoice';
import validate from '../middlewares/validate';
import { invoiceValidation } from '../validations';
import { invoiceController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .post(invoice(), validate(invoiceValidation.createInvoice), invoiceController.createInvoice)
  .get(invoice('getUsers'), validate(invoiceValidation.getInvoices), invoiceController.getInvoices);

router
  .route('/:invoiceId')
  .get(invoice('getUsers'), validate(invoiceValidation.getInvoice), invoiceController.getInvoice)
  .patch(invoice('manageUsers'), validate(invoiceValidation.updateInvoice), invoiceController.updateInvoice)
  .delete(invoice('manageUsers'), validate(invoiceValidation.deleteInvoice), invoiceController.deleteInvoice);

export default router;

/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: Invoice management and retrieval
 */

/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: Create an invoice
 *     description: Create invoice.
 *     tags: [Invoice]
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
 *               clientName:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               eventType:
 *                 type: string
 *               eventDate:
 *                  type: datetime
 *               billOption:
 *                 type: string
 *               fee:
 *                 type: number
 *               logisticInfo:
 *                 type: string
 *               logisticFee:
 *                 type: number
 *               TnC:
 *                 type: string
 *               totalFee:
 *                 type: number
 *             example:
 *               id: 1
 *               userId: 2
 *               talentId: undefined
 *               managerId: undefined
 *               agencyId: 5
 *               clientName: "John Doe"
 *               clientEmail: "joe@gmail.com"
 *               eventType: "Concert"
 *               eventDate: "2022-01-01"
 *               billOption: "Per Day"
 *               fee: 1000000
 *               logisticInfo: "Fully Covered"
 *               logisticFee: 2000000
 *               TnC: "By signing this, you agree to our TnC"
 *               totalFee: 3000000
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invoice'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all invoices
 *     description: Retrieve all invoices.
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Invoice name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Invoice role
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
 *         description: Maximum number of invoices
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
 *                     $ref: '#/components/schemas/Invoice'
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
 * /invoice/{invoiceId}:
 *   get:
 *     summary: Get an invoice
 *     description: Fetch an invoice by id.
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invoice'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an invoice
 *     description: Logged in users can only update their own information. Only admins can update other invoices.
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice id
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
 *               clientName:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               eventType:
 *                 type: string
 *               eventDate:
 *                  type: datetime
 *               billOption:
 *                 type: string
 *               fee:
 *                 type: number
 *               logisticInfo:
 *                 type: string
 *               logisticFee:
 *                 type: number
 *               TnC:
 *                 type: string
 *               totalFee:
 *                 type: number
 *             example:
 *               id: 1
 *               userId: 2
 *               talentId: undefined
 *               managerId: undefined
 *               agencyId: 5
 *               clientName: "John Doe"
 *               clientEmail: "joe@gmail.com"
 *               eventType: "Concert"
 *               eventDate: "2022-01-01"
 *               billOption: "Per Day"
 *               fee: 1000000
 *               logisticInfo: "Fully Covered"
 *               logisticFee: 2000000
 *               TnC: "By signing this, you agree to our TnC"
 *               totalFee: 3000000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Invoice'
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
 *     summary: Delete an invoice
 *     description: Logged in users can delete only themselves. Only admins can delete other invoices.
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice id
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
