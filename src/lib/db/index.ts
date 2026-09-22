import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@127.0.0.1:5432/laziyer";

const client = postgres(connectionString, {
  max: 1,           // keep at 1 for serverless; each invocation gets its own connection
  idle_timeout: 20, // release idle connections after 20 s
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });
export { schema };
