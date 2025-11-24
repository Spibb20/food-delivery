import { OrderMap } from "./_components/OrderMap";
import { Orders } from "./_components/Orders";

export default function Order() {
  return (
    <div className="w-full h-screen bg-gray-500">
      <div className="flex">
        <div className="pl-10 mt-10 ">
          <Orders />
          <OrderMap/>
        </div>
      </div>
    </div>
  );
}
