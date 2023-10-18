import { useFlags } from "launchdarkly-react-client-sdk";
import { PlaneIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

const navbar = () => {
  const { enableFlightStatus } = useFlags()
  const router = useRouter();

  useEffect(() => {
    if (enableFlightStatus) {
      toast({
        title: "Flight Status Enabled",
        description: "Flight status is now enabled.",
      });
    }
  }, [enableFlightStatus]);

  return (
    <>
    <Toaster />
    <div className="flex h-16 bg-white items-center shadow-2xl border-b-0 border-gray-800 relative">
      <div className="flex items-center">
        <Link href="/">
        <p className="flex text-black text-4xl ml-8">
          <PlaneIcon size={42} className="" />
          Toggle<span className="font-bold text-black outfitters">Airlines</span>
        </p>
        </Link>
      </div>
      <div className="flex ml-16">
        <div className="pr-5 h-full">
          <Link
            className={`text-2xl  text-black hover:border-b-4 hover:border-blue-700 ${
              router.pathname === "/"
                ? "border-b-4 border-blue-700 font-bold"
                : ""
            }`}
            href="/"
          >
            Book
          </Link>
        </div>
        {/* <div className="pr-5">
          <Link
            className={`text-2xl  text-black hover:border-b-4 hover:border-blue-700 ${
              router.pathname === "/checkin" ? "border-b-4 border-blue-700" : ""
            }`}
            href="/"
          >
            Check-In
          </Link>
        </div> */}
        <div className="pr-5">
          <Link
            className={`text-2xl  text-black hover:border-b-4 hover:border-blue-700 ${
              router.pathname === "/mytrips" ? "border-b-4 border-blue-700" : ""
            }`}
            href="/mytrips"
          >
            My Trips
          </Link>
        </div>
        { enableFlightStatus && 
        <div className="pr-5">
          <Link
            className={`text-2xl  text-black hover:border-b-4 hover:border-blue-700  ${
              router.pathname === "/flightstatus" ? "border-b-4 border-blue-700" : ""
            }`}
            href="/flightstatus"
          >
            Flight Status
          </Link>
        </div>
}
      </div>
      <div className="ml-auto mr-16">
        <button className="bg-blue-700 hover:bg-blue-700/80 text-white py-2 px-6 font-semibold text-xl">
          Sign In
        </button>
      </div>
    </div>
    </>
  );
};

export default navbar;
