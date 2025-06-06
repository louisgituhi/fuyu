import { betterAuth } from "better-auth"
import { db } from "~/database/db"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { session, user, verification } from "~/database/schema"
import { account } from "auth-schema"
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            account,
            session,
            verification
        }
    }),
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
    }
})