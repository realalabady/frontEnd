import type { Route } from "./+types/details";
import type { project as Project, StrapiProject, StrapiResponse } from "~/type";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { id } = params;
  console.log(id);
  const res = await fetch(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }api/projects?filters[id][$eq]=${parseInt(id)}&populate=*`
  );
  // console.log(res);

  if (!res.ok) {
    throw new Response("Project not found", { status: 404 });
  }
  const json = await res.json();

  if (!json.data || json.data.length === 0) {
    throw new Response("Project not found", { status: 404 });
  }

  const item = json.data[0];

  const project = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    category: item.categories,
    featured: item.featured,
    image: item.image?.url
      ? `${item.image.url}`
      : `https://res.cloudinary.com/ddpeddscz/image/upload/v1764265950/small_project_1_e9ef6661dd.png`,
    url: item.url,
    date: item.date,
  };

  return { project };
}
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;
  console.log(project);
  return (
    <>
      <Link
        to="/project"
        className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" /> Back To Projects
      </Link>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            {project.title}
          </h1>
          <p className="text-gray-300 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} • {project.category}
          </p>
          <p className="text-gray-200 mb-6">{project.description}</p>

          <a
            href={project.url}
            target="_blank"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            View Live Site →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
