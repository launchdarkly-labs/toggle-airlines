// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import airports from '@/lib/airportData'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { airports } from '@/schema/schema'

type Data = {
    id: number,
    cityName: string | null,
    airportCode: string | null,
    country: string | null
  }[]

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

    const allFlights = await db.select().from(airports)
  res.status(200).json(allFlights)
}
