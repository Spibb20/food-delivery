import { LogoContainerFlex } from "./LogoContainer";
import { Button } from "./Buttons";
import { adminState } from "@/lib/types";

export const AdminNavigation = ({
  onclickOrders,
  onclickFoodMenu,
}: adminState) => {
  return (
    <aside className="flex flex-col gap-3 items-center w-64 h-screen bg-gray-100">
      <LogoContainerFlex />
      <div className="w-[165px] h-[104px] flex flex-col justify-between py-3 ">
        <Button
          type="button"
          btnFor="adminButton"
          btnIcon="/admin/admin-foodMenu-icon.svg"
          clickHandler={onclickFoodMenu}
        >
          Food Menu
        </Button>
        <Button
          type="button"
          btnFor="adminButton"
          btnIcon="/admin/admin-orders-icon.svg"
          clickHandler={onclickOrders}
        >
          Orders
        </Button>
      </div>
    </aside>
  );
};
