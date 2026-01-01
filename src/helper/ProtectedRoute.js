import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRouter({ element, isProtected }) {
  const isAuthenticated = useSelector((state) => state.authReducer.isLogin);

  // route is protected and user is not authenticated
  // if (isProtected && !isAuthenticated) {
  //   return <Navigate replace to="/login" />;
  // }

  // redirect to dashboard if user is authenticated and tries to unauthorized routes
  if (isAuthenticated && !isProtected) {
    return <Navigate replace to="/" />;
  }

  return element;
}
export default ProtectedRouter;
