import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import agencyRoute from './agency.route';
import agencyManagerRoute from './agencyManager.route';
import managerRoute from './manager.route';
import talentRoute from './talent.route';
import calendarRoute from './calendar.route';
import inquiryRoute from './inquiry.route';
import invoiceRoute from './invoice.route';
import docsRoute from './docs.route';
import config from '../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/agency',
    route: agencyRoute
  },
  {
    path: '/agencyManager',
    route: agencyManagerRoute
  },
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/calendar',
    route: calendarRoute
  },
  {
    path: '/inquiry',
    route: inquiryRoute
  },
  {
    path: '/invoice',
    route: invoiceRoute
  },
  {
    path: '/manager',
    route: managerRoute
  },
  {
    path: '/talents',
    route: talentRoute
  },
  {
    path: '/users',
    route: userRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
