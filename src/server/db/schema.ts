// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `student-management_${name}`,
);

export const students = createTable("student", {
  id: int("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: text("age").notNull(),
  class: text("class").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});
