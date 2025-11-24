import Image from "next/image";

export function Img() {
  return (
    <div>
      <Image
        src={"/login.jpg"}
        className="rounded-2xl"
        alt={"aaa"}
        width={856}
        height={904}
        unoptimized
      />
    </div>
  );
}
