import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RouteLoading } from "@/routes/RouteLoading";
import { useUserStore } from "@/stores/useUserStore";

export const PublicRoute = () => {
  const location = useLocation();

  const user = useUserStore((state) => state.user);
  const credentials = useUserStore((state) => state.credentials);
  const isInitializing = useUserStore((state) => state.isInitializing);

  if (isInitializing) {
    return <RouteLoading />;
  }

  const isAuthenticated = Boolean(user && credentials?.accessToken);

  if (isAuthenticated) {
    const rawRedirect = new URLSearchParams(location.search).get("redirect");

    const redirect =
      rawRedirect?.startsWith("/") && !rawRedirect.startsWith("//")
        ? rawRedirect
        : "/";

    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
