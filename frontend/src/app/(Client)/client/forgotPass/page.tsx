import { Img } from "../login/_components/image";
import { ForgotPassword } from "./_components/forgot";


export default function ForgotHome() {
  return (
    <div className="flex gap-5 items-center justify-center">
      <ForgotPassword />
      <Img />
    </div>
  );
}
