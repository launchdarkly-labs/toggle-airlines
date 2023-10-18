import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const flights = pgTable('flights', {
    id: serial('id').primaryKey(),
    flightNumber: text('flight_number'),
    origin: text('origin'),
    destination: text('destination'),
    duration: text('duration'),
    flightStatus: text('flight_status'),
});

export const airports = pgTable('airports', {
    id: serial('id').primaryKey(),
    cityName: text('cityname'),
    airportCode: text('airportcode'),
    country: text('country'),
});