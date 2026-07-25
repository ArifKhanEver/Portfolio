import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Shafiqul Islam Khan | Portfolio",
  description: "MERN Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className={`${poppins.className} font-sans min-h-full flex flex-col bg-white text-slate-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScrolling>
            <CustomCursor />
            <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}