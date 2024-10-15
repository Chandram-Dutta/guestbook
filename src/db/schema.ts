import { text, sqliteTable, int } from "drizzle-orm/sqlite-core";

export const guestbookTable = sqliteTable("guestbook", {
    id: int().primaryKey({ autoIncrement: true }),
    ip: text().notNull(),
    name: text(),
    message: text().notNull(),
    date: int({ mode: 'timestamp' }).notNull(),
})