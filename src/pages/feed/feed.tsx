import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedsInfo, getOrdersInfo } from '../../services/slices/feed';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const handleGetFeeds = () => {
    dispatch(getFeedsInfo());
  };

  useEffect(handleGetFeeds, []);

  const orders: TOrder[] = useSelector(getOrdersInfo);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
