import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <body className={`${poppins.className} font-sans min-h-full flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}