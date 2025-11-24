"use client";

import { CategoryTypes, FoodsTypes } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { api } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { EditFood } from "./FoodEditDialog";

import { upload } from "@vercel/blob/client";

export function ArrayMap() {
  const [dishes, setDishes] = useState<FoodsTypes[]>([]);
  const [food, setFood] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [ingredients, setIngredients] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  async function add(categoryId: string) {
    const file = fileInputRef.current?.files?.[0];
    if (!food.trim() || price <= 0 || !ingredients.trim() || !file) {
      alert("Please complete all dish fields and select an image.");
      return;
    }

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      const body = {
        food: food.trim(),
        price,
        image: blob.url,
        ingredients,
        category: categoryId,
      };

      const res = await api.post("/foods", body);

      setDishes((prev) => [...prev, res.data]);
      setFood(""); setPrice(0); setIngredients("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Could not add dish", error);
      alert("Could not add dish.");
    }
  }

  return (
    <div>
      <div className="flex flex-col w-full gap-10 px-10 py-10 ">
        {categories.map((cat) => {
          const dishForCat = dishes.filter((d) => {
            const catId = d.category?._id;
            return catId === cat._id;
          });

          return (
            <section key={cat._id}>
              <h1 className="text-3xl font-bold">
                {cat.category} ({dishForCat.length})
              </h1>
              <div className="flex flex-wrap gap-6 bg-white rounded-2xl">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="bg-white border-dashed border-2 border-orange-400  rounded-2 w-[270px] h-[241px] flex flex-col items-center justify-center gap-5 ">
                      <div className="flex flex-col items-center justify-center">
                        <Button
                          variant={"secondary"}
                          className="bg-orange-400 flex flex-col rounded-[50%]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8.00065 3.33301V12.6663M3.33398 7.99967H12.6673"
                              stroke="#FAFAFA"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                        <p>Add new Dish to {cat.category} </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[460px] h-[592px] border-2 rounded-2xl ">
                    <DialogHeader>
                      <DialogTitle className="text-3xl">
                        Add new Dish to {cat.category}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <div className="grid gap-1">
                        <Label>Food name</Label>
                        <Input
                          placeholder="Type food name"
                          className="w-[200px]"
                          value={food}
                          onChange={(e) => setFood(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="username-1">Food price</Label>
                        <Input
                          placeholder="Enter price..."
                          value={price || ""}
                          onChange={(e) => setPrice(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <Label>Ingredients</Label>
                    <Input
                      placeholder="List Ingredients..."
                      className="w-full h-20 pb-10 pr-7 text-[14px] "
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                    />
                    <p>Food image</p>
                    <div className="relative bg-gray-100">
                      <Input
                        className="h-[150px]"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        placeholder="choose a file or drag & drop it here"
                      />
                      <div className="bg-white w-[50px] h-[50px] rounded-[50%] absolute left-50 right-50 top-15 flex items-center justify-center">
                        <svg
                          className=""
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M14 10L11.9427 7.94267C11.6926 7.69271 11.3536 7.55229 11 7.55229C10.6464 7.55229 10.3074 7.69271 10.0573 7.94267L4 14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2ZM7.33333 6C7.33333 6.73638 6.73638 7.33333 6 7.33333C5.26362 7.33333 4.66667 6.73638 4.66667 6C4.66667 5.26362 5.26362 4.66667 6 4.66667C6.73638 4.66667 7.33333 5.26362 7.33333 6Z"
                            stroke="#09090B"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => add(cat._id)}>Add Dish</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {dishForCat.map((dish) => (
                  <div
                    key={dish._id}
                    className="bg-white  w-[270px] border-2 rounded-2xl h-[241px] pt-3 flex flex-col items-center justify-center gap-2  relative"
                  >
                    <Image
                      className="w-[239px] h-[150px]"
                      src={dish.image}
                      alt={dish.ingredients}
                      width={239}
                      height={50}
                      unoptimized
                    />

                    <EditFood dish={dish} categories={categories} />
                    <div className="flex gap-7">
                      <p className="text-orange-400">{dish.food}</p>
                      <span>${dish.price}</span>
                    </div>
                    <p className="px-4  text-[12px]">{dish.ingredients}</p>
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
