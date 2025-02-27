import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  return user?.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
