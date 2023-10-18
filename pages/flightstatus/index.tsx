import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import airports from "@/lib/airportData";
import { useFlags } from "launchdarkly-react-client-sdk";

interface Flight {
  flightNumber: string;
  origin: string;
  destination: string;
  duration: string;
  flightStatus: string;
}

const FlightStatus = () => {
  const { flightAPI } = useFlags();

  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await fetch('/api/flightStatus');
      const data = await response.json();
      setFlights(data);
    };
    fetchFlights();
  }, []);

  console.log(flights)

  // const getRandomFlightStatus = () =>
  //   Math.random() > 0.25 ? "On Time" : "Delayed";
  // const getRandomDuration = () =>
  //   `${Math.floor(Math.random() * 5 + 1)}h ${Math.floor(Math.random() * 59)}m`;
  // const getRandomAirport = () =>
  //   airports[Math.floor(Math.random() * airports.length)].AirportCode;
  // const getRandomFlightNumber = () => {
  //   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let result = "TA-";
  //   for (let i = 0; i < 4; i++) {
  //     result += chars[Math.floor(Math.random() * chars.length)];
  //   }
  //   return result;
  // };

  // const flights = Array.from({ length: 10 }, () => ({
  //   origin: getRandomAirport(),
  //   destination: getRandomAirport(),
  //   duration: getRandomDuration(),
  //   flightStatus: getRandomFlightStatus(),
  //   flightNumber: getRandomFlightNumber(),
  // }));

  return (
    <div className="flex flex-col items-center min-h-screen py-2 bg-white">
      <div className="relative">
        <img
          src="/statusboard.png"
          alt="Airplane"
          className="w-screen object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <h1 className="text-4xl lg:text-8xl font-bold pb-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center shadow-lg">
          Flight Status
        </h1>
      </div>
      <div className="grid mt-4 mx-auto w-3/4">
        <Table>
          <TableHeader>
            <TableRow className="text-3xl text-black text-center">
              <TableHead className="text-center">Flight ID</TableHead>
              <TableHead className="text-center">Start</TableHead>
              <TableHead className="text-center">End</TableHead>
              <TableHead className="text-center">Duration</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight, index) => (
              <TableRow className="text-xl text-center" key={index}>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.duration}</TableCell>
                <TableCell
                  className={
                    flight.flightStatus === "On Time"
                      ? "text-green-500 text-center"
                      : "text-red-500 text-center"
                  }
                >
                  <Badge
                    className="text-xl text-center"
                    variant={
                      flight.flightStatus === "On Time" ? "ontime" : "destructive"
                    }
                  >
                    {flight.flightStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FlightStatus;
