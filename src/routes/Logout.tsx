/* eslint-disable @typescript-eslint/no-unused-vars */
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { logout } from "../app/userProfileSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout());
  });

  const user = useAppSelector((state) => state.userProfile);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Logging out</h2>
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Logout;
