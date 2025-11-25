import Link from "next/link";
import { Button } from "./ui/button";

export function SignUpLogin({
  logged,
}: {
  setLoggedIn?: (value: boolean) => void;
  logged?: () => void;
}) {
  return (
    <div className="flex gap-5">
      <Link href={"/sign-up"}>
        <Button className="rounded-xl bg-gray-100 text-black hover:bg-gray-200">
          Sign up
        </Button>
      </Link>

      <Link href={"/sign-in"}>
        <Button
          onClick={logged}
          className="rounded-xl bg-orange-600 hover:bg-orange-700"
        >
          Log in
        </Button>
      </Link>
    </div>
  );
}
