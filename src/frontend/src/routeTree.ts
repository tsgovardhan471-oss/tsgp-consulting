import {
  createRootRoute,
  createRoute,
  type createRouter,
} from "@tanstack/react-router";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

export const routeTree = rootRoute.addChildren([homeRoute, adminRoute]);

// Required for type inference
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter<typeof routeTree>>;
  }
}
