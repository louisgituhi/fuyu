import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres";

const client = postgres("postgresql://postgres:postgres@127.0.0.1:54322/postgres")
export const db = drizzle(client)