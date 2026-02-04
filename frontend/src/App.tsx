import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layouts/Default";
import Home from "./routes/pages/Home";
import Detail from "./routes/pages/Detail";

const router = createBrowserRouter([
  {
    Component: Default,
    children: [
      {
        path: "",
        Component: Home
      },
      {
        path: "/detail/:id",
        Component: Detail,
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
