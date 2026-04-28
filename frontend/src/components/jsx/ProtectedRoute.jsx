import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedTypes, children }) => {
  if (!allowedTypes.includes(user)) {
    return <Navigate to="/" replace />;
  }
  return children;
};