import { Outlet } from "react-router";
import Hero from "~/components/Hero";
const MainLayout = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default MainLayout;
