import "./globals.css";
import Navbar from "../components/Utils/Navbar";
import Footer from "../components/Utils/Footer";
import { CartProvider } from "../contexts/cartContext";
import { getServerSession } from "next-auth/next";
import { options } from "../app/api/auth/[...nextauth]/options";
const baseURL = process.env.BASE_URL;

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  const user = session?.user;

  return (
    <html lang="en">
      <body>
        <CartProvider baseURL={baseURL} user={user}> 
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}