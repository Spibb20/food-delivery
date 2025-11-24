import { useOrder } from "@/context/food.provider";
import { CardContent } from "./ui/card";

export function CartPrice({ empty: _empty }: { empty?: boolean }) {
  const { cart } = useOrder();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.howMuch,
    0
  );
  const shipping = cart.length > 0 ? 0.99 : 0;
  const total = totalPrice + shipping;
  return (
    <>
      <CardContent className="grid gap-6  ">
        <h1 className="text-gray-500 text-2xl pt-5">Payment info </h1>
        <div className="flex justify-between">
          <p className="text-gray-500">Items</p>
          <h1 className="font-bold text-2xl">
            {cart.length === 0 ? "--" : `$${totalPrice}`}{" "}
          </h1>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Shipping</p>
          <h1 className="font-bold text-2xl">
            {cart.length === 0 ? "--" : `$${shipping}`}{" "}
          </h1>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Total</p>
          <h1 className="font-bold text-2xl">
            {cart.length === 0 ? "--" : `$${total}`}
          </h1>
        </div>
      </CardContent>
    </>
  );
}
