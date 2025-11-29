import { useEffect, useState } from "react";
import type { project } from "~/type";
import ProjectCard from "~/components/projectCard";

type FeaturedProps = {
  /** Optional list of projects. If not provided the component will fetch from the API. */
  projects?: project[];
  /** Optional max number of featured items to show. Defaults to showing all featured. */
  limit?: number;
  className?: string;
};

/**
 * Reusable FeaturedProjects component.
 * - Pass `projects` to reuse existing data from a page loader.
 * - If `projects` is not provided the component fetches `/projects` and filters `featured`.
 * - `limit` can be used to show only N featured items.
 */
const Featured = ({ projects, limit, className }: FeaturedProps) => {
  const [items, setItems] = useState<project[] | null>(projects ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (projects) return; // If projects are provided as props, don't fetch

    const fetchFeaturedProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_STRAPI_API_URL}api/projects?populate=*&filters[featured][$eq]=true`
        );
        if (!res.ok) {
          throw new Error(`Failed to load projects: ${res.status}`);
        }
        const json = await res.json();
        const fetchedProjects = json.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.categories,
          featured: item.featured,
          image: item.image?.url ? `${item.image.url}` : null,
          url: item.url,
          date: item.date,
        }));
        setItems(fetchedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, [projects]);

  if (loading)
    return <div className={className}>Loading featured projects...</div>;
  if (error)
    return (
      <div className={className}>Error loading featured projects: {error}</div>
    );
  if (!items || items.length === 0)
    return <div className={className}>No featured projects yet.</div>;

  const shown = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <div
      className={
        className ?? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      }
    >
      {shown.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
};

export default Featured;
