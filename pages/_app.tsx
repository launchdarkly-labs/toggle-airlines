import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/nav";
import { TripsProvider } from "@/utils/contexts/TripContext";
import NoSSRWrapper from "@/components/no-ssr";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { v4 as uuidv4 } from 'uuid';


let c;

if (typeof window !== "undefined") {
  const uniqueKey = uuidv4().slice(0, 4);

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "",
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
    context: {
      kind: "multi",
      user: {
        key: uniqueKey,
        name: "anonymous",
        appName: "ToggleAir",
      },
      device: {
        key: uniqueKey,
        operating_system: "MacOS",
        mobile_device: "False",
      },
    },
  });

  c = ({ Component, pageProps }: AppProps) => {
    return (
      <>
        <NoSSRWrapper>
          <LDProvider>
            <TripsProvider>
              <NavBar />
              <Component {...pageProps} />
            </TripsProvider>
          </LDProvider>
        </NoSSRWrapper>
      </>
    );
  };
} else {
  c = () => null;
}

export default c;
