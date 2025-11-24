import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";

export function CheckingUser() {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-orange-500 text-white w-[439px]"
            >
              Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[429px] h-[184px] flex flex-col justify-center gap-10 items-center">
            <DialogHeader>
              <DialogTitle className=" text-2xl">
                You need to log in first{" "}
              </DialogTitle>
            </DialogHeader>

            <DialogFooter className="flex gap-5">
              <Link href={"/client/login"}>
                <Button className="w-[182px]">Log in</Button>
              </Link>
              <Link href={"/client/signUp"}>
                <Button variant="outline" className="w-[182px]" type="submit">
                  Sign up
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
