import { useEffect } from "react";

import { meAuth } from "@/api/auth/meAuth";
import { useUserStore } from "@/stores/useUserStore";

export const useAuthBootstrap = () => {
  useEffect(() => {
    const bootstrap = async () => {
      const { credentials, setUser, removeCredentials, setInitializing } =
        useUserStore.getState();

      if (!credentials?.accessToken) {
        setInitializing(false);
        return;
      }

      try {
        const response = await meAuth();

        setUser(response.data);
      } catch (error) {
        console.error("Session restore failed:", error);

        removeCredentials();
      } finally {
        setInitializing(false);
      }
    };

    bootstrap();
  }, []);
};
