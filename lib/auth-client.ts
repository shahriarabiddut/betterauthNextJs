import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "@/lib/constants/env";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [twoFactorClient()],
});
export const { useSession } = authClient;
