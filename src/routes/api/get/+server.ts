import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';
import { guestbookTable } from "../../../db/schema";

export const GET: RequestHandler = async () => {
    const turso = createClient({
        url: TURSO_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN,
    });
    const db = drizzle(turso);

    const queries = await db.select({
        name: guestbookTable.name,
        message: guestbookTable.message,
        date: guestbookTable.date,
    }).from(guestbookTable);

    return new Response(JSON.stringify(queries), { status: 200 });
};