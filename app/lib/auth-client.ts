import { createAuthClient } from "better-auth/react";

const baseURL =
	typeof window !== "undefined"
		? window.location.origin
		: process.env?.PUBLIC_SITE_URL;
export const { signIn, signUp, useSession, signOut } = createAuthClient({
	baseURL,
});
