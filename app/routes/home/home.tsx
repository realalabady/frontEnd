import { Outlet } from "react-router";
import Hero from "~/components/Hero";
import Featured from "~/components/featured";
export function meta() {
  return [
    { title: "Hoorraaayy" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto px-6 my-16">
        <h2 className="text-3xl text-white font-bold mb-8">
          Featured Projects
        </h2>
        <Featured
          limit={3}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        />
      </section>
    </>
  );
}
