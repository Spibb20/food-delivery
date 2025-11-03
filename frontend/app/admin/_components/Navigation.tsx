import Image from "next/image";

export const Navigation = () => {
  return (
    <div className="flex">
      <Image alt="logo" src="/admin/logo.png" width={36} height={29.18}></Image>
      <div>
        <p>NomNom</p>
        <p>Swift delivery</p>
      </div>
    </div>
  );
};
