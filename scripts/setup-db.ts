/**
 * Local DB setup script.
 * Runs migrations in order against the DATABASE_URL in .env.
 * Safe to run multiple times — all SQL uses IF NOT EXISTS guards.
 *
 * Usage: npm run db:setup
 */
import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

config({ path: resolve(process.cwd(), ".env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("ERROR: DATABASE_URL is not set in .env");
  process.exit(1);
}

const MIGRATIONS = [
  "drizzle/0000_pretty_wither.sql",
  "drizzle/0001_typed_tables.sql",
];

async function setup() {
  const { default: postgres } = await import("postgres");
  const sql = postgres(connectionString!, { max: 1 });

  for (const file of MIGRATIONS) {
    const path = resolve(process.cwd(), file);
    console.log(`Applying: ${file}`);
    try {
      const migration = readFileSync(path, "utf-8");
      // drizzle-kit migrations use '--> statement-breakpoint' as separator
      const statements = migration
        .split("--> statement-breakpoint")
        .map((s) => s.trim())
        .filter(Boolean);

      for (const statement of statements) {
        await sql.unsafe(statement);
      }
      console.log(`  ✓ ${file}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // Skip "already exists" errors from the base migration
      if (message.includes("already exists")) {
        console.log(`  ~ ${file} (some objects already existed, skipped)`);
      } else {
        console.error(`  ✗ ${file}: ${message}`);
        await sql.end();
        process.exit(1);
      }
    }
  }

  await sql.end();
  console.log("\nDatabase setup complete. Run 'npm run db:seed' to seed sample data.");
  process.exit(0);
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
