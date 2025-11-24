import { Fullscreen } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-[668px]">
      <Image
        src="/hero.png"
        alt="Hero"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
    </section>
  );
}
