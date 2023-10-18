import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav";
import { CalendarIcon, MoveHorizontalIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import AirportPicker from "@/components/airportPicker";
import { motion } from "framer-motion";
import TripsContext from "@/utils/contexts/TripContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { toast } = useToast();
  const [fromLocation, setFromLocation] = useState("From");
  const [toLocation, setToLocation] = useState("To");
  const [showSearch, setShowSearch] = useState(false);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
  const { bookedTrips, setBookedTrips } = useContext(TripsContext);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  function setAirport() {
    setShowSearch(true);
  }

  function bookTrip() {
    const tripId = Math.floor(Math.random() * 900) + 100; // Generate a random 3 digit number
    setBookedTrips([
      ...bookedTrips,
      { id: tripId, from: fromLocation, to: toLocation, startDate, returnDate },
    ]);

    toast({
      title: "Flight booked",
      description: `Your flight from ${fromLocation} to ${toLocation} has been booked.`,
    });
  }

  return (
    <>
      <main className={`flex h-screen bg-white flex-col`}>
        <div className="flex flex-row items-center place-content-center mx-auto my-8">
          <div className="flex items-center px-16">
            <button
              onClick={() => {
                setActiveField("from");
                setShowSearch(true);
              }}
            >
              <p className="text-6xl font-extralight px-4 py-2 ">
                {fromLocation}
              </p>
            </button>
            <MoveHorizontalIcon
              strokeWidth={1}
              width={50}
              size={50}
              className="stroke-ldblue"
            />
            <button
              onClick={() => {
                setActiveField("to");
                setShowSearch(true);
              }}
            >
              <p className="text-6xl  font-extralight  px-4   py-2 ">
                {toLocation}
              </p>
            </button>
            {showSearch && activeField && (
              <AirportPicker
                setToLocation={setToLocation}
                setFromLocation={setFromLocation}
                setShowSearch={setShowSearch}
                activeField={activeField}
                toLocation={toLocation}
                fromLocation={fromLocation}
              />
            )}
          </div>

          <motion.div
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center"
          >
            <div className="flex space-x-10 items-center text-2xl px-16">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button>
                      {startDate ? (
                        <div className="flex flex-col items-center">
                          <p className="text-2xl">Depart</p>
                          <p className="text-3xl">
                            {startDate.toLocaleDateString("en-US")}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 border-b-2 border-gray-600 py-2 pr-12">
                          <CalendarIcon size={30} />
                          <p className="text-4xl">Depart</p>
                        </div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button>
                      {returnDate ? (
                        <div className="flex flex-col items-center">
                          <p className="text-2xl">Return</p>
                          <p className="text-3xl">
                            {returnDate.toLocaleDateString("en-US")}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 border-b-2 border-gray-600 py-2 pr-12">
                          <CalendarIcon size={30} />
                          <p className="text-4xl">Return</p>
                        </div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="px-16">
                <motion.button
                  whileTap={{ scale: 0.5, color: "green" }}
                  onClick={() => bookTrip()}
                  className={`bg-blue-700 hover:bg-blue-700/80 mx-auto text-white py-2 px-6 font-semibold text-xl ${
                    !toLocation ||
                    toLocation === "To" ||
                    !fromLocation ||
                    fromLocation === "From" ||
                    !startDate ||
                    !returnDate
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    !toLocation ||
                    toLocation === "To" ||
                    !fromLocation ||
                    fromLocation === "From" ||
                    !startDate ||
                    !returnDate
                  }
                >
                  Book Now!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="grid xl:flex xl:py-24 mb-8 bg-ldgray w-full shadow-2xl items-center mx-auto text-white">
          <div className="flex mx-auto w-2/3">
            <div className="grid mx-auto w-2/3">
              <p className="text-7xl pb-4">
                Toggle<span className="font-bold outfitters">Airlines</span>
              </p>
              <p className="text-2xl font-light pt-4">
                LaunchDarkly into the skies. In the air in milliseconds, reach
                your destination without risk, and ship your travel dreams
                faster than ever before.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center gap-x-24 mb-14 z-0 ">
          <Card className="flex w-[320px] h-auto border-0 relative flex-col justify-center items-center animate-fade-in grid-rows-2 bg-gray-50 z-0">
            <CardHeader>
              <img src="planefleet.jpg" className="mx-auto" />
            </CardHeader>
            <CardTitle className="flex justify-center p-2 py-4">
              <p className="font-bold text-3xl text-gray-900 text-center">
                Wheels-Up On Toggle Airlines!
              </p>
            </CardTitle>
            <CardContent>
              <p className="text-gray-700 pt-2 text-lg text-center">
                Launch flightly into the skies. Live the life of comfort, spead,
                and excitement as board any of our hundreds of flights a month.
                Travel globally, without the risk.
              </p>
            </CardContent>
          </Card>
          <Card className="flex w-[320px] h-auto border-0  relative flex-col justify-center items-center animate-fade-in grid-rows-2 bg-gray-50">
            <CardHeader>
              <img src="travel.jpg" className="mx-auto" />
            </CardHeader>
            <CardTitle className="flex justify-center p-2 py-4">
              <p className="font-bold text-3xl text-gray-900 text-center">
                Toggle "On" Your Next Trip
              </p>
            </CardTitle>
            <CardContent>
              <p className="text-gray-700 pt-2 text-lg text-center">
                With more than 100 points of presence globally, you'll be able
                to fly anywhere you need in the blink of eye. Resolve your
                travel, ship your family faster.
              </p>
            </CardContent>
          </Card>
          <Card className="flex w-[320px] h-auto border-0 relative flex-col justify-center items-center animate-fade-in grid-rows-2 bg-gray-50">
            <CardHeader>
              <img src="travelticket.jpg" className="mx-auto" />
            </CardHeader>
            <CardTitle className="flex justify-center p-2 py-4">
              <p className="font-bold text-3xl text-gray-900 text-center">
                Generous Loyalty Programs
              </p>
            </CardTitle>
            <CardContent>
              <p className="text-gray-700 pt-2 text-lg text-center">
                The more you fly, the more your status grows. Enjoy free
                upgrades, priority boarding, exlusive flights and more! Reach{" "}
                <span className="font-bold">Toggle Club</span> status today!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
