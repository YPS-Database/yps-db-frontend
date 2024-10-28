/* eslint-disable @typescript-eslint/no-unused-vars */
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { useAppSelector } from "../app/store";

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
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default AdminDashboard;
