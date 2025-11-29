import type { project } from "~/type";
import { Link } from "react-router";
const ProjectCard = ({ project }: { project: project }) => {
  return (
    <>
      <Link
        className="block transform transition duration-300 hover:scale-[1.02]"
        to={`/project/${project.documentId}`}
      >
        <div className="bg-gray-800 shadow-sm transition border border-gray-700  rounded-lg hover:shadow-md overflow-hidden">
          <img
            className="w-full h-48 object-cover"
            src={project.image}
            alt={project.title}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{project.date}</span>
              <span className="text-sm text-gray-400">{project.category}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
