import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
    return new Response("smooth sailing sailor...", { status: 200 });
};