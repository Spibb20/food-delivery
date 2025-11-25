"use client";

import {
  ArrayPropsTypes,
  CategoryTypes,
  OrderedFood,
  OrderItem,
} from "@/lib/types";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FoodsTypes } from "@/lib/types";

import { api } from "@/lib/api";

import { useEffect, useState } from "react";

import { CheckCircle2Icon } from "lucide-react";
import { useOrder } from "@/context/food.provider";

export function MappingFoods() {
  const { addToCart } = useOrder();

  const [dishes, setDishes] = useState<FoodsTypes[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [orderCount, setOrderCount] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/foods");
        setDishes(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
    (async () => {
      try {
        const res = await api.get("/category");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col w-full gap-10 px-6 py-10 bg-gray-700">
        {categories.map((cat) => {
          const dishForCat = dishes.filter((d) => d.category?._id === cat._id);
          if (dishForCat.length === 0) return null;

          return (
            <section
              key={cat._id}
              className="mx-auto flex w-full max-w-[1264px] flex-col"
            >
              {showAlert && (
                <Alert className="fixed top-6 left-1/2 z-50 w-[300px] -translate-x-1/2 rounded-2xl bg-black text-white">
                  <CheckCircle2Icon />
                  <AlertTitle>Food is being added to the cart!</AlertTitle>
                </Alert>
              )}
              <h1 className="mb-5 text-3xl font-bold text-white">
                {cat.category}
              </h1>
              <div className="flex w-full flex-wrap gap-6 rounded-3xl bg-gray-700">
                {dishForCat.map((dish, i) => (
                  <div
                    key={dish._id}
                    className="relative flex h-[342px] w-full max-w-[397px] flex-col items-center justify-center gap-2 rounded-3xl border border-gray-200 bg-white pt-3 shadow-sm"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={dish.image}
                          alt={dish.ingredients}
                          className="h-[210px] w-[360px] rounded-2xl object-cover"
                          width={365}
                          height={210}
                          unoptimized
                        />
                      </DialogTrigger>
                      <DialogContent className="h-[412px] w-[826px] rounded-3xl border border-gray-200 sm:max-w-[826px]">
                        <div className="flex gap-7">
                          <Image
                            src={dish.image}
                            alt={dish.food}
                            className="h-[300px] w-[377px] rounded-2xl object-cover"
                            width={377}
                            height={364}
                            unoptimized
                          />

                          <div className="">
                            <div className="flex flex-col">
                              <DialogTitle className="text-3xl font-bold text-orange-500 pb-3">
                                {dish.food}
                              </DialogTitle>
                              <p className="text-gray-500 ">
                                {dish.ingredients}
                              </p>
                            </div>

                            <div className="flex flex-col pt-10">
                              <div className="flex gap-40 ">
                                <div className="flex flex-col">
                                  <p className="text-gray-500">Total price</p>
                                  <h1 className="font-bold">${dish.price}</h1>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <Button
                                    className="h-11 w-11 rounded-full border border-black bg-white text-black"
                                    onClick={() =>
                                      setOrderCount(Math.max(1, orderCount - 1))
                                    }
                                    disabled={orderCount <= 1}
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.33398 8H12.6673"
                                        stroke="#18181B"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Button>{" "}
                                  <h1 className="font-bold text-[19px]">
                                    {orderCount}
                                  </h1>
                                  <Button
                                    className="h-11 w-11 rounded-full border border-black bg-white text-black"
                                    onClick={() =>
                                      setOrderCount(orderCount + 1)
                                    }
                                  >
                                    <svg
                                      width="11"
                                      height="11"
                                      viewBox="0 0 11 11"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M5.16667 0.5V9.83333M0.5 5.16667H9.83333"
                                        stroke="#18181B"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="">
                          <Button
                            className="w-[370px]"
                            onClick={() => {
                              addToCart(dish, orderCount);
                              setShowAlert(true);
                              setTimeout(() => setShowAlert(false), 2000);
                            }}
                          >
                            Add to cart
                          </Button>
                        </DialogFooter>
                      </DialogContent>

                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant={"secondary"}
                          className="absolute right-6 top-40 h-11 w-11 rounded-full bg-white text-black shadow-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8.00065 3.33325V12.6666M3.33398 7.99992H12.6673"
                              stroke="#EF4444"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <div className="flex w-full items-center justify-between gap-4 px-4">
                      <p className="line-clamp-1 text-orange-400 text-2xl">
                        {dish.food}
                      </p>
                      <span>${dish.price}</span>
                    </div>
                    <p className="px-4 text-[12px] line-clamp-2">
                      {dish.ingredients}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
