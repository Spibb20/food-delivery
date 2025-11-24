import Link from "next/link";
import { Button } from "./ui/button";

export function SignUpLogin({ logged }: { setLoggedIn?: (value: boolean) => void; logged?: () => void }) {
  return (
    <div className="flex gap-5">
      <Link href={"/client/signUp"}>
        <Button className="bg-gray-400">Sign up</Button>
      </Link>

      <Link href={"/client/login"}>
        <Button onClick={logged} className="bg-orange-600">
          Log in
        </Button>
      </Link>
    </div>
  );
}
