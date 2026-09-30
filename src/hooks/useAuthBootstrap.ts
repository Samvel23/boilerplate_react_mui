import { useEffect } from "react";

import { meAuth } from "@/api/auth/meAuth";
import { useUserStore } from "@/stores/useUserStore";

export const useAuthBootstrap = () => {
  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        await useUserStore.persist.rehydrate();

        if (cancelled) {
          return;
        }

        const { credentials, setUser, removeCredentials, setInitializing } =
          useUserStore.getState();

        if (!credentials?.accessToken) {
          setInitializing(false);
          return;
        }

        try {
          const response = await meAuth();

          if (cancelled) {
            return;
          }

          setUser(response.data);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error("Session restore failed:", error);
          removeCredentials();
        } finally {
          if (!cancelled) {
            setInitializing(false);
          }
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Auth bootstrap failed:", error);

        const { removeCredentials, setInitializing } = useUserStore.getState();

        removeCredentials();
        setInitializing(false);
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);
};
