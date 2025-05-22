import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NavProvider from "@/contexts/Nav";
import ThemeProvider from "@/contexts/Theme";
import { LangProvider } from "@/contexts/LangContext";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SeniorLink | Home",
  description:
    "It is SeniorLink Website. It is Created by using Modern Technology Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider>
          <LangProvider>
            <AuthProvider>
              <NavProvider>
                {/* Here NavProvider is a Context API Provider */}
                <Header />
              </NavProvider>
              <div className="mt-16">
                {/* This div is used because header component is given h-16(4rem or 64px) height and Position Fixed */}
                {children}
              </div>
              <Footer />
            </AuthProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
