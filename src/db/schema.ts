import { int, float, varchar, serial, mysqlTable } from 'drizzle-orm/mysql-core';

export const catsTable = mysqlTable('cats', {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    age: float().notNull()
});