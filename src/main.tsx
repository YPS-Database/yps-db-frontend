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
import DynamicPage from "./routes/DynamicPage.tsx";
import AdminRoot from "./routes/AdminRoot.tsx";
import Login from "./routes/Login.tsx";
import Logout from "./routes/Logout.tsx";
import AdminDashboard from "./routes/AdminDashboard.tsx";
import EditDynamicPage from "./routes/EditDynamicPage.tsx";
import UploadDatabase from "./routes/UploadDatabase.tsx";
import EntryPage from "./routes/EntryPage.tsx";
import DataPage from "./routes/DataPage.tsx";

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
    path: "/entry/:entryId",
    element: <EntryPage />,
  },
  {
    path: "/about",
    element: <DynamicPage title="About" slug="about" />,
  },
  {
    path: "/publications",
    element: <DynamicPage title="Publications" slug="publications" />,
  },
  {
    path: "/data",
    element: <DataPage />,
  },
  {
    path: "/submit",
    element: <DynamicPage title="Suggest a resource" slug="submit" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    element: <AdminRoot />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/upload-db",
        element: <UploadDatabase />,
      },
      {
        path: "/admin/edit-page/home",
        element: <EditDynamicPage title="Landing" slug="home" />,
      },
      {
        path: "/admin/edit-page/about",
        element: <EditDynamicPage title="About" slug="about" />,
      },
      {
        path: "/admin/edit-page/publications",
        element: <EditDynamicPage title="Publications" slug="publications" />,
      },
      {
        path: "/admin/edit-page/data",
        element: <EditDynamicPage title="Dataset" slug="data" />,
      },
      {
        path: "/admin/edit-page/submit",
        element: <EditDynamicPage title="Suggest a resource" slug="submit" />,
      },
    ],
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
