import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedTypes, children }) => {
  if (!allowedTypes.includes(user)) {
    // Redireciona para home se o usuário não tiver permissão
    return <Navigate to="/" replace />;
  }
  return children;
};