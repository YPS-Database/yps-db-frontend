import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store";

function AdminRoot() {
  const user = useAppSelector((state) => state.userProfile);

  if ((user.loggedIn && user.level === "admin") || user.level === "superuser") {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

export default AdminRoot;
