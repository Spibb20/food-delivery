"use client";

import { useOrder } from "@/context/food.provider";
import Image from "next/image";
import { Button } from "./ui/button";

export function CartList() {
  const { cart, cancel, updateQuantity } = useOrder();

  return (
    <div className="max-h-[210px] overflow-y-auto">
      {cart.map((item) => (
        <div key={item.foodId} className="flex gap-3 border-b py-3">
          <Image
            src={item.image || "/food.jpg"}
            alt={item.name}
            width={124}
            height={120}
            className="w-[124px] h-[120px] rounded-xl object-cover"
            unoptimized
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h2 className="text-orange-500 font-bold">{item.name}</h2>
                <p className="text-xs text-gray-500">{item.ingredients}</p>
              </div>
              <Button type="button" variant="outline" className="rounded-full border-orange-500" onClick={() => cancel(item.foodId)}>×</Button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-3">
                <Button type="button" variant="ghost" onClick={() => updateQuantity(item.foodId, Math.max(1, item.howMuch - 1))}>−</Button>
                <span>{item.howMuch}</span>
                <Button type="button" variant="ghost" onClick={() => updateQuantity(item.foodId, item.howMuch + 1)}>+</Button>
              </div>
              <span className="font-bold">${item.price * item.howMuch}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
