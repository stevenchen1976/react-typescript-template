import { lazy } from "react";
import { RouteProps } from "react-router-dom";

const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("@/pages/Home"))
  },
  {
    path: "/test-page",
    component: lazy(() => import("@/pages/TestPage"))
  }
];

export default routes;
