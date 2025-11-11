import { ButtonProps } from "@/lib/types";
import Image from "next/image";

export const Button = ({
  clickHandler,
  children,
  btnFor,
  type,
  btnIcon,
}: ButtonProps) => {
  const color = {
    adminButton: "",
  };
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`cursor-pointer rounded-md flex gap-2 h-[22px] active:bg-black active:text-white p-4 items-center  ${
        color[btnFor as keyof typeof color] ?? ""
      }`}
    >
      <Image
        alt="admin navigation icon"
        src={btnIcon}
        height={22}
        width={22}
        quality={100}
        className=" active:bg-white"
      ></Image>
      {children}
    </button>
  );
};
