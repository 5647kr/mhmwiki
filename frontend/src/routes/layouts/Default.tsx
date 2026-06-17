import { Outlet } from "react-router";

export default function Default() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
