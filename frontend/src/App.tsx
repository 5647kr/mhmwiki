import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layouts/Default";
import Home from "./routes/pages/Home";
import Detail from "./routes/pages/Detail";
import Report from "./routes/pages/Report";
import NotFound from "./components/NotFound";
import Roulette from "./routes/pages/Roulette";
import Charm from "./routes/pages/Charm";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Default,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/detail/:id",
        Component: Detail,
      },
      {
        path: "/report",
        Component: Report,
      },
      {
        path: "/roulette",
        Component: Roulette,
      },
      {
        path: "/charm",
        Component: Charm,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
