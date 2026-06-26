import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layouts/Default";
import Home from "./routes/pages/Home";
import Detail from "./routes/pages/Detail";
import NotFound from "./routes/pages/NotFound";
import History from "./routes/pages/History";
import Report from "./routes/pages/Report";

const router = createBrowserRouter([
  {
    path: "",
    Component: Default,
    children: [
      {
        path: "/",
        Component: Home,
      },
      { path: "monster/:id", Component: Detail },
      { path: "/history", Component: History },
      { path: "/report", Component: Report },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
