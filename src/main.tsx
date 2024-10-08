import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import "./index.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";

import Landing from "./routes/Landing.tsx";
import NotFound from "./routes/NotFound.tsx";
import Search from "./routes/Search.tsx";
import PreLaunchModal from "./components/PreLaunchModal.tsx";
import TheApp from "./components/TheApp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/test",
    element: <div className="text-lg">Hello world!</div>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TheApp>
        <PreLaunchModal />
        <RouterProvider router={router} />
      </TheApp>
    </Provider>
  </StrictMode>,
);
