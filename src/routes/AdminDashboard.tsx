import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { useAppSelector } from "../app/store";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const user = useAppSelector((state) => state.userProfile);

  return (
    <>
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          {user.level === "admin" && <h2 className="mb-2 text-xl">Admin</h2>}
          {user.level === "superuser" && (
            <h2 className="mb-2 text-xl">Superuser</h2>
          )}

          <div className="my-4 flex flex-col">
            <h3 className="text-lg">Database</h3>
            <Link to="/admin/upload-db">Upload new database version</Link>
            <Link to="/admin/manage-dbs">Manage database versions</Link>
            {user.level === "superuser" && (
              <Link to="/admin/import-file-list">
                Import S3 file list (Superuser)
              </Link>
            )}
          </div>

          <div className="my-4 flex flex-col">
            <h3 className="text-lg">Edit pages</h3>
            <Link to="/admin/edit-page/home">Landing page</Link>
            <Link to="/admin/edit-page/about">About</Link>
            <Link to="/admin/edit-page/publications">Publications</Link>
            <Link to="/admin/edit-page/data">Dataset</Link>
            <Link to="/admin/edit-page/submit">Suggest a resource</Link>
          </div>

          <div className="my-4 flex flex-col">
            <h3 className="text-lg">Actions</h3>
            {user.level === "superuser" && (
              <Link to="/admin/logs">See logs (Superuser)</Link>
            )}
            <Link to="/logout">Log out</Link>
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default AdminDashboard;
