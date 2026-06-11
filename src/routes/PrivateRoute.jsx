import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (auth?.loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
         <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (auth?.user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}
