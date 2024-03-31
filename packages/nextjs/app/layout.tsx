import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Stormbit",
    template: "%s | StormBIt Core",
  },
  description: "Built by Q3 Labs using 🏗 Scaffold-ETH 2",
  openGraph: {
    title: {
      default: "StormBIt App",
      template: "%s | StormBIt Core",
    },
    description: "Built by Q3 Labs using 🏗 Scaffold-ETH 2",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "StormBIt",
      template: "%s | StormBIt Core",
    },
    description: "Built by Q3 Labs using 🏗 Scaffold-ETH 2",
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className="w-screen">
      <head>
        <link rel="icon" href="/logo.ico" />
      </head>
      <body>
        <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
