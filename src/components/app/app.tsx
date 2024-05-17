import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute, ProtectedRouteAuth } from '../protected-route';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { useEffect } from 'react';
import { fetchUserProfile } from '../../slices/userSlice';
import { fetchGetIngredients } from '../../slices/feedSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGetIngredients());
    if (localStorage.getItem('accessToken')) dispatch(fetchUserProfile());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Детали заказа'
              onClose={() => {
                navigate(-1);
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='/ingredients' />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              onClose={() => {
                navigate(-1);
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRouteAuth>
              <Login />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRouteAuth>
              <Register />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRouteAuth>
              <ForgotPassword />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRouteAuth>
              <ResetPassword />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal
                title='Детали заказа'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
