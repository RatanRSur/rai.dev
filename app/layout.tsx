import "./globals.css";
import localFont from "next/font/local";
import { VoronoiBackground, GoogleAnalyticsWrapper } from "./components/ClientWrapper";

const exposure = localFont({
  src: [
    {
      path: "./fonts/Exposure/ExposureTrial[-10].otf",
      style: "normal",
    },
    {
      path: "./fonts/Exposure/ExposureItalicTrial[-10].otf",
      style: "italic",
    },
  ],
  variable: "--font-exposure",
});

const jslBlackletter = localFont({
  src: [
    {
      path: "./fonts/jsl_blackletter/JBlack.ttf",
      style: "normal",
    },
  ],
  variable: "--font-jsl-blackletter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <head>
        <title>rai sur</title>
      </head>
      <body className={`${exposure.className} ${jslBlackletter.variable} h-full`}>
        <GoogleAnalyticsWrapper id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        <VoronoiBackground />
        {children}
      </body>
    </html>
  );
}
