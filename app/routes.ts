import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main.tsx", [index("routes/home/home.tsx")]),
  //   route("routes/about/about.tsx", "about"),
  //   route("routes/contact/contact.tsx", "contact"),
  //   route("routes/blog/blog.tsx", "blog"),
  //   route("routes/project/project.tsx", "project"),
  layout("layouts/home.tsx", [
    route("about", "routes/about/about.tsx"),
    route("contact", "routes/contact/contact.tsx"),
    route("blog", "routes/blog/blog.tsx"),
    route("project", "routes/project/project.tsx"),
    route("project/:id", "routes/project/details.tsx"),
  ]),
] satisfies RouteConfig;
