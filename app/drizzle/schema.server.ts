// import { sql } from "drizzle-orm";
// import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/* drizzleでスキーマ定義 */

// export const users = sqliteTable("users", {
//   id: integer("id").primaryKey(),
//   email: text("email").notNull().unique(),
//   password: text("password").notNull(),
// });

// export const books = sqliteTable("books", {
//   id: integer("id").primaryKey(),
//   title: text("title").notNull(),
//   createdAt: text("created_at")
//     .notNull()
//     .default(sql`CURRENT_TIMESTAMP`),
//   updatedAt: text("updated_at")
//     .notNull()
//     .default(sql`CURRENT_TIMESTAMP`),
// });
