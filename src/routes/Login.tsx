/* eslint-disable @typescript-eslint/no-unused-vars */
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../app/apiSlice";
import TheLoadingModal from "../components/TheLoadingModal";
import { useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");

  const [loginRequest, { isLoading, error: loginError }] = useLoginMutation();

  const user = useAppSelector((state) => state.userProfile);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      user.loggedIn &&
      (user.level === "admin" || user.level === "superuser")
    ) {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <>
      {isLoading && <TheLoadingModal />}
      <TheHeader />
      <div id="content" className="my-8 flex flex-col items-start gap-3 px-10">
        <div className="hover-red w-full rounded-lg bg-boxBg px-8 py-6">
          <h2 className="mb-2 text-xl">Login</h2>
          <form
            className="mx-auto flex w-[28em] max-w-full items-stretch justify-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              loginRequest({ password });
            }}
          >
            <div className="flex flex-1 overflow-hidden rounded-lg border border-slate-400">
              <div className="flex flex-1 items-center gap-2 px-2">
                <FeatherIcon icon="key" size="18" />
                <input
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-grow"
                  type="password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-lg border border-slate-400 px-3 py-1"
            >
              Submit
            </button>
          </form>
          {loginError && (
            <div className="mt-2 text-center text-red-600">
              Could not log in.
            </div>
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}

export default Login;
