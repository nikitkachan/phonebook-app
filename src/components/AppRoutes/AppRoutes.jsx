import * as ROUTES from 'constants/routes.js';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';
import { lazy } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage/RegisterPage')
);
const PhonebookPage = lazy(() =>
  import('../../pages/PhonebookPage/PhonebookPage')
);

export const appRoutes = [
  {
    path: ROUTES.HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: ROUTES.LOGIN_ROUTE,
    element: (
      <RestrictedRoute navigateTo={ROUTES.CONTACTS_ROUTE}>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.REGISTER_ROUTE,
    element: (
      <RestrictedRoute navigateTo={ROUTES.CONTACTS_ROUTE}>
        <RegisterPage />
      </RestrictedRoute>
    ),
  },
  {
    path: ROUTES.CONTACTS_ROUTE,
    element: (
      <PrivateRoute>
        <PhonebookPage />
      </PrivateRoute>
    ),
  },
];
