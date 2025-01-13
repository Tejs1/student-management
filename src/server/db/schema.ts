// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `student-management_${name}`,
);

export const students = createTable("student", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }),
  age: varchar("age").notNull(),
  class: varchar("class").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
