import Image from "next/image";

export const LogoContainer = () => {
  return (
    <div className="w-[88px] h-[95px] pt-5 pl-5 flex flex-col items-center ">
      <Image
        alt="logo"
        src="/admin/logo.png"
        width={36}
        height={29.18}
        quality={100}
      ></Image>
      <div className="flex flex-col items-center w-full">
        <div className="flex w-full items-center">
          <h4 className="font-bold">Num</h4>
          <span className="font-bold text-red-400 size-5">Num</span>
        </div>
        <div className="w-full flex justify-center">
          <p className="text-[10px]">Swift delivery</p>
        </div>
      </div>
    </div>
  );
};

export const LogoContainerFlex = () => {
  return (
    <div className="w-[146px] h-11 pt-5 pl-5 flex items-center gap-2">
      <Image alt="logo" src="/admin/logo.png" width={36} height={29.18}></Image>
      <div className="flex flex-col w-full h-auto">
        <div className="flex items-center">
          <h4 className="font-bold">Num</h4>
          <span className="font-bold text-red-400 size-5">Num</span>
        </div>
        <div className="w-full">
          <p className="text-[10px] ">Swift delivery</p>
        </div>
      </div>
    </div>
  );
};
