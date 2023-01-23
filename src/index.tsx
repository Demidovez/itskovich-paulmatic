import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import AdminLayout from '~src/layouts/Admin';
import AuthLayout from '~src/layouts/Auth/Auth';
import { store } from '~src/store/store';

import '~src/assets/plugins/nucleo/css/nucleo.css';
import 'fortawesome/fontawesome-free/css/all.min.css';
import '~src/assets/scss/argon-dashboard-react.scss';
import '~src/assets/vendor/fullcalendar/dist/fullcalendar.min.css';
import '~src/assets/vendor/sweetalert2/dist/sweetalert2.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'style.scss';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminLayout />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
  },
  {
    path: '*',
    element: <Navigate to="/admin/index" replace />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
