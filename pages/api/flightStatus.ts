import type { NextApiRequest, NextApiResponse } from 'next'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { flights } from '@/schema/schema'

type Data = {
    id: number,
    origin: string | null,
    destination: string | null,
    duration: string | null,
    flightNumber: string | null,
    flightStatus: string | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data[]>
) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        throw new Error('DATABASE_URL is not set')
    }
    const client = postgres(connectionString)
    const db = drizzle(client);

    const allFlights = await db.select().from(flights)
    res.status(200).json(allFlights)
}
