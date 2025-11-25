"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryTypes, FoodsTypes } from "@/lib/types";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export function Category() {
  const [dishes, setDishes] = useState<FoodsTypes[]>([]);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/category");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const res = await api.get("/foods");
        setDishes(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function add() {
    if (!newCategory.trim()) return null;
    try {
      const res = await api.post("/category", {
        category: newCategory.trim(),
      });
      setCategories((prev) => [...prev, res.data]);
      setNewCategory("");
    } catch (error) {
      console.error(error, "rrrrr");
    }
  }
  return (
    <div className="flex h-fit w-full max-w-[1171px] flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl font-bold">Dishes category</h1>
      </div>

      <div>
        <div className="flex max-w-[1171px] flex-wrap gap-4">
          {categories.map((c) => {
            const dishForCat = dishes.filter(
              (dish) => dish.category?._id === c._id
            );

            return (
              <div key={c._id}>
                <Button variant={"secondary"}>
                  {c.category}
                  <Badge variant="outline" className="bg-black text-white">
                    {dishForCat.length}
                  </Badge>
                </Button>
              </div>
            );
          })}
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-col items-center justify-center">
                <Button
                  variant={"secondary"}
                  className="bg-orange-400 flex flex-col rounded-full"
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
              </div>
            </DialogTrigger>
            <DialogContent className="w-[460px] h-[262px] rounded-2xl border-4  ">
              <DialogHeader>
                <DialogTitle className="text-3xl">Add new category</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2">
                <div className="">
                  <Label className="mb-4">Category name</Label>
                  <Input
                    className="w-[300px]"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Type category name"
                  />
                </div>{" "}
              </div>

              <DialogFooter>
                <Button
                  className="bg-black"
                  onClick={() => add()}
                  disabled={!newCategory.trim()}
                >
                  Add category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
