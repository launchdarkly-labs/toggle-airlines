import TripsContext from "@/utils/contexts/TripContext";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { delay } from "lodash";
import { useContext, useState } from "react";

export default function MyTrips() {
  const { bookedTrips, cancelTrip, setBookedTrips } = useContext(TripsContext);
  const [status, setStatus] = useState("Economy");

  console.log(bookedTrips);

  const handleCancel = (index: any) => {
    // Maybe show a confirmation dialog here
    cancelTrip(index);
    // Remove the trip from the bookedTrips array
    setBookedTrips(
      bookedTrips.filter((_: any, tripIndex: number) => tripIndex !== index)
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { x: -300, opacity: 0 },
    show: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2 bg-white">
      <div className="relative">
        <img
          src="/airportstatus.png"
          alt="Airplane"
          className="w-screen object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-4xl lg:text-8xl font-bold pb-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center shadow-lg">
          My Trips
        </h1>
      </div>

      <motion.div
        className="w-2/3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {bookedTrips.map(
            (trip: { id: number; from: string; to: string }, index: number) => (
              <motion.div
                key={trip.id}
                className="w-full border-2 border-black/10 shadow-2xl rounded-2xl mb-4 mt-8"
                variants={childVariants}
                initial="hidden"
                animate="show"
                exit="exit" // Add this line
              >
                <div key={index} className="flex justify-between p-4">
                  <div className="flex flex-col text-black">
                    <p className="text-2xl">
                      <span className="font-bold">Confirmation Number:</span>{" "}
                      {trip.id}
                    </p>
                    <p className="text-2xl">
                      <span className="font-bold">Traveling from:</span>{" "}
                      {trip.from}
                    </p>
                    <p className="text-2xl">
                      <span className="font-bold">Destiation:</span> {trip.to}
                    </p>
                  </div>
                  <div>
                    <p className="text-black text-2xl">Fare Type: {status}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleCancel(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
                    >
                      Upgrade
                    </button>
                    <button
                      onClick={() => handleCancel(index)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
