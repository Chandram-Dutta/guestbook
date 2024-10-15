import type { RequestHandler } from './$types';
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';
import { guestbookTable } from '../../../db/schema';

export const POST: RequestHandler = async ({ request }) => {
    const { ip, name, message } = await request.json();
    const turso = createClient({
        url: TURSO_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN,
    });

    const db = drizzle(turso);
    await db.insert(guestbookTable).values({ ip, name, message, date: new Date() });

    return new Response("ok", { status: 200 });
};