  "use client";

  import { Img } from "./_components/image";
  import { Login } from "./_components/login";

  export default function LoginHome() {
    return (
      <>
        <div className="flex items-center  justify-center gap-10">
          <Login />
          <Img />
        </div>
      </>
    );
  }
