import { useState } from "react";
import type { Route } from "./+types/project";
import type { project } from "~/type";
import ProjectCard from "~/components/projectCard";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import { image } from "framer-motion/client";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: project[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_STRAPI_API_URL}api/projects?populate=*`
  );
  if (!res.ok) {
    throw new Response("Failed to load projects", { status: res.status });
  }
  const json = await res.json();
  const projects = json.data.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    category: item.categories,
    featured: item.featured,
    image: item.image?.url ? `${item.image.url}` : null,
    url: item.url,
    date: item.date,
  }));
  console.log(image.$$typeof);

  return { projects };
}
const Project = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: project[] };
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract unique categories from projects
  const categories = ["all", ...new Set(projects.map((p) => p.category))];

  // Filter projects by selected category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Pagination: 7 projects per page
  const projectsPerPage = 4;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  console.log(projects);
  return (
    <>
      <h1 className="text-3xl text-white font-bold mb-8  ">Project</h1>

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition capitalize ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {/* Key the container to page/category so AnimatePresence can animate between sets */}
        <motion.div
          key={`${selectedCategory}-${currentPage}`}
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Project;
