import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <section className="max-w-6xl px-4 py-8 mx-auto font-sans">
      <Outlet />
    </section>
  );
};

export default HomeLayout;
