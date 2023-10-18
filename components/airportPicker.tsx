import { useEffect, useState, useRef } from "react";
import { Airport } from "../types/Airport";
import {motion} from "framer-motion";
import debounce from 'lodash/debounce'; // Add this


interface AirportPickerProps {
  setFromLocation: (location: string) => void;
  setToLocation: (location: string) => void;
  setShowSearch: (show: boolean) => void;
  activeField: "from" | "to";
  toLocation: string;
  fromLocation: string;
}

const airportPicker: React.FC<AirportPickerProps> = ({
  setFromLocation,
  setToLocation,
  setShowSearch,
  activeField,
  toLocation,
  fromLocation,
}) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);


  async function getAirports() {
    const airports = await fetch("/api/airports");
    console.log(airports)
    const airportsJson: Airport[] = await airports.json();
    setAirports(airportsJson);
    return airportsJson;
  }

  const filterAirports = debounce(() => {
    const filtered = airports.filter(airport =>
      airport.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airport.airportCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAirports(filtered);
  }, 250);

  useEffect(() => {
    getAirports();
  }, []);

  useEffect(() => {
    filterAirports();
    // Cleanup debounce function on unmount
    return filterAirports.cancel;
}, [searchTerm]);

useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setShowSearch(false);
        }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [setShowSearch, containerRef]); // Add dependencies here

  const handleSelect = (airport: Airport) => {
    setSelectedAirport(airport);
    if (activeField === "from" && airport.cityName !== toLocation) {
      setFromLocation(airport.airportCode);
    } else if (activeField === "to" && airport.cityName !== fromLocation) {
      setToLocation(airport.airportCode);
    }
    setShowSearch(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md text-black z-50">
      <motion.div
        key="airport-picker"
        initial={{  y: -800, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: .25 }}
        ref={containerRef}
        className="bg-white p-6 rounded-lg h-2/3 w-full xl:h-2/3 xl:w-1/2 overflow-y-hidden"
      >
       <h2 className="text-xl mb-4 text-black"><span className="border-b-4 border-ldblue">Search</span></h2>
        
        {/* Search input */}
        <p className="text-sm pb-2 text-black">City or Airport Code</p>
        <input
          className=" rounded p-2 mb-4 border-2 shadow-2xl border-gray-500/40 w-2/3"
          placeholder="Search by city or airport code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="border-b-4 border-ldblue mb-2 text-white" />
        {filteredAirports.map((airport, index) => (
          <div
            key={index}
            onClick={() => handleSelect(airport)}
            className="cursor-pointer text-black hover:text-ldblue hover:font-bold p-2 rounded-md"
          >
            {airport.cityName} ({airport.airportCode})
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default airportPicker;
