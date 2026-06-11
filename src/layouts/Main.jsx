import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Main() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="font-sans min-h-screen flex flex-col bg-base-100 text-base-content selection:bg-primary selection:text-white">
      <Navbar />
      <main className={`flex-grow ${!isHome ? "pt-20" : ""}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
