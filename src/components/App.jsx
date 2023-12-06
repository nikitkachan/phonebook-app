import { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Loader from './Loader/AuthLoader';
import { appRoutes } from './AppRoutes/AppRoutes';
import { useDispatch } from 'react-redux';
import { refreshThunk } from 'redux/auth/auth.reducer';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};
