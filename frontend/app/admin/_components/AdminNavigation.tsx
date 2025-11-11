import { LogoContainerFlex } from "./LogoContainer";
import { Button } from "./Buttons";

export const AdminNavigation = () => {
  return (
    <div className="flex flex-col gap-3 items-center w-[205px] h-screen">
      <LogoContainerFlex />
      <div className="w-[165px] h-[104px] flex flex-col justify-between py-3 ">
        <Button
          type="button"
          btnFor="adminButton"
          btnIcon="/admin/admin-foodMenu-icon.svg"
        >
          Food Menu
        </Button>
        <Button
          type="button"
          btnFor="adminButton"
          btnIcon="/admin/admin-orders-icon.svg"
        >
          Orders
        </Button>
      </div>
    </div>
  );
};
