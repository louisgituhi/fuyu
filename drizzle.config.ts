import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./app/database/schema.ts",
    dialect: "postgresql",
    out: "./app/migrations",
    dbCredentials: {
        url: "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
    }
})