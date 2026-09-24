import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUserStore } from "@/stores/useUserStore";

export const PublicRoute = () => {
  const location = useLocation();

  const user = useUserStore((state) => state.user);
  const credentials = useUserStore((state) => state.credentials);
  const isInitializing = useUserStore((state) => state.isInitializing);

  if (isInitializing) {
    return null;
  }

  const isAuthenticated = Boolean(user && credentials?.accessToken);

  if (isAuthenticated) {
    const redirect =
      new URLSearchParams(location.search).get("redirect") || "/";

    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
