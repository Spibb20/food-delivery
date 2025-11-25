import { OrderMap } from "./_components/OrderMap";
import { Orders } from "./_components/Orders";

export default function Order() {
  return (
    <div className="min-h-screen w-full bg-slate-500 px-10 py-9">
      <div className="mx-auto max-w-[1172px]">
        <Orders />
        <OrderMap />
      </div>
    </div>
  );
}
