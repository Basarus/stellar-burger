import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetOrders, selectOrders } from '../../slices/feedSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const { data } = useSelector(selectOrders);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchGetOrders());
  }, []);
  const orders: TOrder[] = data ?? [];

  return <ProfileOrdersUI orders={orders} />;
};
