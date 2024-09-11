import { Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HueHabit",
  description: "Track your habits and improve your life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'w-full max-w-[2000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col ' + inter.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
