import { ScrollRestoration, useLocation, useParams } from "react-router";
import { MainHeader, DetailHeader } from "../../components/Header";

export default function Default() {
  const { id } = useParams();
  const location = useLocation();
  console.log(id, location);
  return (
    <>
      <ScrollRestoration />
      {location.pathname === "/" ? <MainHeader /> : <DetailHeader />}
    </>
  );
}
