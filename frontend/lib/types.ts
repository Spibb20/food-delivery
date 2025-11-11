import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type ButtonProps = {
  clickHandler?: () => void;
  children: React.ReactNode;
  btnFor?: "adminButton" | string;
  type?: "button" | "submit" | "reset";
  btnIcon: string;
};
