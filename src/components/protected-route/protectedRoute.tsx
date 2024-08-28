import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthorized } from '../../services/slices/userData';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isAuthRequired: boolean;
};

export const ProtectedRoute = ({
  isAuthRequired = true,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isUserAuthorized = useSelector(getIsAuthorized);
  if (isUserAuthorized != isAuthRequired) {
    if (isUserAuthorized) {
      const previousPage = location.state?.from || { pathname: '/' };
      return <Navigate replace to={previousPage} />;
    }
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  return children;
};
