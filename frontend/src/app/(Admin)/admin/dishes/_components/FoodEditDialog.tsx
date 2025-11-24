"use client";
import { api } from "@/lib/api";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditFoodTypes } from "@/lib/types";
import { upload } from "@vercel/blob/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EditFood({ dish, categories }: EditFoodTypes) {
  const [foodName, setFoodName] = useState(dish.food);
  const [categoryId, setCategoryId] = useState(dish.category._id);
  const [ingredients, setIngredients] = useState(dish.ingredients);
  const [price, setPrice] = useState(dish.price);
  const [image] = useState(dish.image);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  async function Edit() {
    if (!foodName.trim() || price <= 0 || !ingredients.trim() || !categoryId) return;
    try {
      setSaving(true);
      let nextImage = image;
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        const blob = await upload(file.name, file, { access: "public", handleUploadUrl: "/api/blob/upload" });
        nextImage = blob.url;
      }
      await api.patch(`/foods/${dish._id}`, { food: foodName.trim(), price, ingredients: ingredients.trim(), image: nextImage, category: categoryId });
      window.location.reload();
    } catch (error) { console.error("Could not update dish", error); }
    finally { setSaving(false); }
  }

  async function Delete() {
    try { await api.delete(`/foods/${dish._id}`); window.location.reload(); }
    catch (error) { console.error("Could not delete dish", error); }
  }

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              variant={"secondary"}
              className="rounded-[50%] w-11 h-11 absolute  right-2 top-25"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_26080_5480)">
                  <path
                    d="M11.334 1.99955C11.5091 1.82445 11.7169 1.68556 11.9457 1.5908C12.1745 1.49604 12.4197 1.44727 12.6673 1.44727C12.9149 1.44727 13.1601 1.49604 13.3889 1.5908C13.6177 1.68556 13.8256 1.82445 14.0007 1.99955C14.1757 2.17465 14.3146 2.38252 14.4094 2.61129C14.5042 2.84006 14.5529 3.08526 14.5529 3.33288C14.5529 3.58051 14.5042 3.8257 14.4094 4.05448C14.3146 4.28325 14.1757 4.49112 14.0007 4.66622L5.00065 13.6662L1.33398 14.6662L2.33398 10.9996L11.334 1.99955Z"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_26080_5480">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[472px] h-[596px]">
            <DialogHeader>
              <DialogTitle>Dishes info</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2">
              <div className="flex gap-3">
                <Label htmlFor="name-1" className="text-gray-400">
                  Dishes name
                </Label>
                <Input
                  id="name-1"
                  name="name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Label htmlFor="name-2" className="text-gray-400">
                  Dishes category
                </Label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[200px] justify-between"
                    >
                      {categories.find((cat) => cat._id === categoryId)
                        ?.category || "Select category"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          fill="none"
                          stroke="currentColor"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.map((cat) => {
                      return (
                        <DropdownMenuItem
                          key={cat._id}
                          onClick={() => setCategoryId(cat._id)}
                        >
                          {cat.category}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-3">
                <Label htmlFor="name-3" className="text-gray-400">
                  Ingredients
                </Label>
                <Input
                  id="name-3"
                  name="name"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Label htmlFor="name-4" className="text-gray-400">
                  Price{" "}
                </Label>
                <Input
                  id="name-4"
                  name="name"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                />
              </div>
              <div className="flex gap-3">
                <Label htmlFor="name-4" className="text-gray-400">
                  Image
                </Label>
                <Input ref={fileInputRef} type="file" accept="image/*" className="w-[390px] h-[150px]" />
              </div>
            </div>
            <DialogFooter className="pr-10 flex gap-55 ">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={Delete}
                  className="border border-orange-400 rounded w-12 h-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M2 3.99967H14M12.6667 3.99967V13.333C12.6667 13.9997 12 14.6663 11.3333 14.6663H4.66667C4 14.6663 3.33333 13.9997 3.33333 13.333V3.99967M5.33333 3.99967V2.66634C5.33333 1.99967 6 1.33301 6.66667 1.33301H9.33333C10 1.33301 10.6667 1.99967 10.6667 2.66634V3.99967"
                      stroke="#EF4444"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </DialogClose>
              <Button type="button" disabled={saving} onClick={Edit}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
