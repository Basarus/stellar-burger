import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFeedsOrders,
  fetchGetFeeds,
  fetchGetIngredients
} from '../../slices/feedSlice';
import { AppDispatch } from 'src/services/store';

export const Feed: FC = () => {
  const orders = useSelector(selectFeedsOrders);
  const dispatch = useDispatch<AppDispatch>();

  function handleGetFeeds() {
    dispatch(fetchGetFeeds());
  }

  useEffect(() => {
    dispatch(fetchGetFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
