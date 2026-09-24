import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUserStore } from "@/stores/useUserStore";

export const ProtectedRoute = () => {
  const location = useLocation();

  const user = useUserStore((state) => state.user);
  const credentials = useUserStore((state) => state.credentials);
  const isInitializing = useUserStore((state) => state.isInitializing);

  if (isInitializing) {
    return null;
  }

  const isAuthenticated = Boolean(user && credentials?.accessToken);

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(
      location.pathname + location.search + location.hash,
    );

    return <Navigate to={`/login?redirect=${redirectUrl}`} replace />;
  }

  return <Outlet />;
};
