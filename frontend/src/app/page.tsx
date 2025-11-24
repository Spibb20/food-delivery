import Image from "next/image";
import Dishes from "./(Admin)/admin/dishes/page";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { MappingFoods } from "@/components/MappingFoods";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-500">
      <Navbar />
      <Hero />
      <MappingFoods />
      <Footer />
    </div>
  );
}
