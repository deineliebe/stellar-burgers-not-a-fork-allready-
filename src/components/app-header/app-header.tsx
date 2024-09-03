import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getName } from '../../services/slices/userData';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getName);
  return <AppHeaderUI userName={user} />;
};
