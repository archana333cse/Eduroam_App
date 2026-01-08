import Footer from "@/components/Footer";
import HomePage from "@/components/Homepage";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div >
     <Navbar/>
     <HomePage/>
     <Footer/>
    </div>
  );
}
