import { OrderedFood } from "@/lib/types";
import { Badge } from "./ui/badge";

export function OrderList({ orderedFood }: { orderedFood: OrderedFood[] }) {
  return (
    <div className="w-full flex flex-col gap-6">
      {orderedFood.length === 0 && <p className="text-gray-500">No order history yet.</p>}
      {orderedFood.map((order) => (
        <div key={order._id} className="flex flex-col gap-5 border-b pb-5">
          <div className="flex justify-between gap-10">
            <div className="flex gap-2 font-bold text-[20px]"><h1>${order.totalPrice}</h1><h1>(#{order._id?.slice(-5)})</h1></div>
            <Badge className="bg-transparent border text-black rounded-2xl border-orange-600">{order.status}</Badge>
          </div>
          {order.items.map((item, index) => (
            <div key={`${order._id}-${item.foodId}-${index}`} className="flex justify-between items-center">
              <div className="flex gap-2 mb-3 text-[16px]"><span>🍽️</span><h1 className="text-gray-500">{item.name}</h1></div><p>x{item.howMuch}</p>
            </div>
          ))}
          <div className="flex gap-2 text-[16px]"><span>🕒</span><h1 className="text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}</h1></div>
          <div className="flex gap-2 text-[16px]"><span>📍</span><h1 className="text-gray-500">{order.location}</h1></div>
        </div>
      ))}
    </div>
  );
}
