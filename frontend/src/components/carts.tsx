"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";

import { useState } from "react";
import { CartList } from "./cartList";
import { CartPrice } from "./cartPrice";
import { OrderList } from "./orderList";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { OrderedAlert } from "./orderedAlert";

import { CheckingUser } from "./LoginCheck";
import { api } from "@/lib/api";
import { useOrder } from "@/context/food.provider";
import { useUser } from "@clerk/nextjs";

export function OrderDetail({ location }: { location: string }) {
  const { cart, clearCart, orderedFood, refreshOrders } = useOrder();
  const { user } = useUser();
  const empty = cart.length === 0;
  const [showOrderAlert, setShowOrderAlert] = useState(false);
  const foodAlert = async () => {
    if (!user || empty) return;
    if (!String(location || "").trim()) {
      alert("Please add a delivery location.");
      return;
    }
    try {
      await api.post("/order", {
        items: cart.map((item) => ({ foodId: item.foodId, howMuch: item.howMuch })),
        location: String(location).trim(),
      });
      clearCart();
      await refreshOrders();
      setShowOrderAlert(true);
      window.setTimeout(() => setShowOrderAlert(false), 3000);
    } catch (error) {
      console.error("Could not place order", error);
    }
  };

  return (
    <div className="pr-20">
      <Dialog>
        <form className="">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-9 h-9 rounded-[50%] relative"
            >
              {/* <div className="absolute right-0.5 top-0 rounded-2xl border bg-red-400 ">
                {cartCount}
              </div> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M0.5 0.5H1.83333L3.60667 8.78C3.67172 9.08324 3.84045 9.35432 4.08381 9.54657C4.32717 9.73883 4.62994 9.84023 4.94 9.83333H11.46C11.7635 9.83284 12.0577 9.72886 12.294 9.53856C12.5304 9.34825 12.6948 9.08302 12.76 8.78667L13.86 3.83333H2.54667M5.13333 13.1333C5.13333 13.5015 4.83486 13.8 4.46667 13.8C4.09848 13.8 3.8 13.5015 3.8 13.1333C3.8 12.7651 4.09848 12.4667 4.46667 12.4667C4.83486 12.4667 5.13333 12.7651 5.13333 13.1333ZM12.4667 13.1333C12.4667 13.5015 12.1682 13.8 11.8 13.8C11.4318 13.8 11.1333 13.5015 11.1333 13.1333C11.1333 12.7651 11.4318 12.4667 11.8 12.4667C12.1682 12.4667 12.4667 12.7651 12.4667 13.1333Z"
                  stroke="#18181B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[535px] h-full bg-gray-500 border-0 flex flex-col items-center right-0 left-200  ">
            {showOrderAlert && (
              <Alert className="absolute top-10 right-220 w-[700px] h-[450px] flex  justify-center bg-black text-white">
                <AlertTitle className="font-bold text-3xl">
                  Your order has been successfully placed !
                </AlertTitle>

                <OrderedAlert />
                <Button
                  type="button"
                  className="bg-gray-300  w-[250px] mt-6 absolute bottom-5 text-black"
                >
                  Checkout
                </Button>
              </Alert>
            )}
            <DialogHeader>
              <h1 className="flex items-center gap-2 text-white font-bold pr-80 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_10927_12335)">
                    <path
                      d="M2.05078 2.05005H4.05078L6.71078 14.47C6.80836 14.9249 7.06145 15.3315 7.42649 15.6199C7.79153 15.9083 8.24569 16.0604 8.71078 16.05H18.4908C18.946 16.0493 19.3873 15.8933 19.7418 15.6079C20.0964 15.3224 20.3429 14.9246 20.4408 14.48L22.0908 7.05005H5.12078M9.00078 21C9.00078 21.5523 8.55307 22 8.00078 22C7.4485 22 7.00078 21.5523 7.00078 21C7.00078 20.4478 7.4485 20 8.00078 20C8.55307 20 9.00078 20.4478 9.00078 21ZM20.0008 21C20.0008 21.5523 19.5531 22 19.0008 22C18.4485 22 18.0008 21.5523 18.0008 21C18.0008 20.4478 18.4485 20 19.0008 20C19.5531 20 20.0008 20.4478 20.0008 21Z"
                      stroke="#E4E4E7"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_10927_12335">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Order detail
              </h1>
              <Button className="border-white absolute top-3 right-10 w-9 h-9 border rounded-[50%] bg-transparent">
                <svg
                  className="text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </DialogHeader>
            <DialogTitle>
              <Tabs defaultValue="cart">
                <TabsList>
                  <TabsTrigger
                    value="cart"
                    className="w-[242px]  data-[state=active]:bg-orange-500  data-[state=active]:text-white"
                  >
                    Cart
                  </TabsTrigger>

                  <TabsTrigger
                    value="order"
                    className="w-[242px]  data-[state=active]:bg-orange-500  data-[state=active]:text-white"
                  >
                    Order
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="cart">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-gray-500 text-2xl">
                        My cart
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-6 h-[220px]">
                      {empty === false && (
                        <div>
                          <div className="flex flex-col">
                            <CartList />
                          </div>

                          <h1 className="text-gray-500 text-2xl">
                            Delivery location
                          </h1>
                          <Label className="border rounded-2xl w-[439px] h-20">
                            <p className=" text-[14px] pl-5 pb-5">{location}</p>
                          </Label>
                        </div>
                      )}

                      {empty && (
                        <div className="w-[450px] rounded-2xl h-[182px] flex items-center justify-center flex-col bg-gray-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="61"
                            height="50"
                            viewBox="0 0 61 50"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M28.466 0.324454C28.1516 0.64221 28.14 0.711116 28.1695 2.10014C28.1862 2.89486 28.1462 3.59941 28.0806 3.66556C28.0148 3.73171 27.3185 3.88054 26.5331 3.99604C23.0897 4.50293 20.1947 5.52419 17.1221 7.31615C14.9037 8.61001 13.7012 9.52036 11.8844 11.2812C10.0062 13.1017 8.76643 14.6891 7.16942 17.3187C6.71081 18.0741 5.8289 19.8416 5.8289 20.0058C5.8289 20.0395 5.68507 20.3851 5.50931 20.7737C4.52057 22.9595 3.641 26.9949 3.6092 29.4912C3.58726 31.2177 3.65541 31.1436 1.94663 31.3015C0.652322 31.4212 0.447226 31.4739 0.232006 31.7426C-0.106271 32.1649 -0.0735597 32.6251 0.323131 33.0262C0.655826 33.3626 0.671533 33.3648 2.10798 33.2797C2.90512 33.2324 5.30967 33.1068 7.45149 33.0005C9.59331 32.8942 12.3679 32.7486 13.6173 32.677C17.2052 32.4714 18.1132 32.424 19.913 32.3494C21.6829 32.2759 24.9368 32.1014 28.5451 31.8867C29.7231 31.8165 31.538 31.7281 32.578 31.6902C33.618 31.6523 34.9323 31.5949 35.4986 31.5629C36.065 31.5309 37.9302 31.4422 39.6437 31.3658C41.3571 31.2895 43.6936 31.1711 44.8359 31.1027C45.9782 31.0344 47.5846 30.9446 48.4056 30.9031C49.2267 30.8616 50.2489 30.8023 50.6773 30.7713C51.1056 30.7404 52.1863 30.6808 53.0787 30.6388C58.8981 30.3655 60.4665 30.2322 60.7333 29.988C61.0821 29.6688 61.0905 28.8639 60.7483 28.5507C60.5387 28.3588 60.2745 28.3285 59.0623 28.3567C58.2716 28.3752 57.582 28.3471 57.5298 28.2944C57.4776 28.2415 57.3368 27.5371 57.2168 26.7288C56.9734 25.0881 56.9258 24.856 56.6586 24.0125C56.5557 23.6876 56.4034 23.1561 56.3202 22.8312C56.2369 22.5064 56.116 22.1381 56.0517 22.0127C55.9871 21.8874 55.9344 21.718 55.9344 21.6365C55.9344 21.3288 54.6995 18.5459 54.0535 17.3979C53.1985 15.8782 52.446 14.7083 52.058 14.2954C51.891 14.1174 51.6001 13.7651 51.4116 13.5125C50.6138 12.4425 48.9907 10.8027 47.6644 9.72656C46.6339 8.89023 43.7889 6.99629 42.9537 6.59047C39.269 4.80021 35.8245 3.88199 32.1365 3.70716C30.9727 3.65191 30.4162 3.57302 30.2898 3.44532C30.1807 3.33507 30.1046 2.96534 30.098 2.51397C30.0731 0.814674 30.0361 0.544166 29.7906 0.269985C29.4505 -0.109984 28.872 -0.0862278 28.466 0.324454ZM18.1578 9.73903C18.1563 9.82932 17.908 10.2954 17.6062 10.775C16.7777 12.0908 15.1754 15.1334 15.1751 15.3912C15.175 15.45 15.029 15.8209 14.8505 16.2154C14.672 16.61 14.526 17.0078 14.526 17.0995C14.526 17.1911 14.4717 17.3224 14.4054 17.3909C14.2304 17.5718 13.4108 20.8482 13.1759 22.3062C12.9741 23.557 12.9005 24.302 12.774 26.375C12.6616 28.2143 12.3289 28.4691 9.99324 28.505C8.18153 28.533 7.85104 28.3924 7.52327 27.4545C7.27988 26.7581 7.44798 25.8403 8.2977 23.225C8.99463 21.0802 9.1443 20.7022 9.88226 19.2218C11.0558 16.8676 12.0783 15.2922 13.6304 13.4468C15.7308 10.9495 18.1711 8.951 18.1578 9.73903ZM36.1389 36.0505C33.99 36.103 28.2676 36.3676 25.3649 36.5487C22.9987 36.6964 21.9446 36.7558 18.4202 36.9409C16.3855 37.0476 14.0197 37.1925 13.163 37.2628C12.3063 37.3332 9.94054 37.4559 7.90581 37.5356C5.87109 37.6154 4.1257 37.7071 4.02731 37.7395C3.84324 37.8002 3.85661 38.0144 4.12946 39.3687C4.33105 40.37 4.90506 42.2851 5.18233 42.8816C5.32732 43.1935 5.53969 43.6971 5.65418 44.0009C6.23896 45.5515 7.4903 47.7453 8.61742 49.1958C8.96102 49.6381 9.25178 50 9.2636 50C9.27541 50 9.57345 49.8597 9.926 49.6883C11.7254 48.8132 12.5716 48.4318 13.1411 48.2391C14.9842 47.616 18.065 47.2126 20.1666 47.3196C22.1212 47.419 32.3687 47.4159 33.8023 47.3154C35.3019 47.2104 36.1838 47.031 37.0475 46.6555C37.3331 46.5313 38.2093 46.1643 38.9946 45.8402C39.78 45.516 40.4809 45.2039 40.5523 45.1465C40.6237 45.0891 41.3657 44.7425 42.2011 44.3762C43.0364 44.0099 43.825 43.6518 43.9535 43.5806C44.2327 43.4254 45.2469 42.9603 47.6917 41.866C48.6912 41.4186 49.8011 40.9133 50.158 40.7431C50.515 40.5727 51.1575 40.2761 51.5859 40.0838C52.442 39.6995 53.4911 39.2087 55.1154 38.4328C55.7001 38.1535 56.215 37.925 56.2595 37.925C56.4443 37.925 57.7343 37.272 57.8172 37.1367C57.8666 37.0559 57.799 36.8671 57.6671 36.7174C57.0821 36.0531 55.9417 35.9188 54.4328 36.3366C53.1322 36.6967 51.3681 37.2481 51.0667 37.3888C50.9239 37.4554 50.3398 37.6616 49.7686 37.8468C48.1816 38.3615 44.6956 39.5942 44.2204 39.8088C43.9878 39.9138 43.5054 40.0994 43.1484 40.2213C42.7915 40.3431 41.9153 40.6484 41.2013 40.8998C39.7772 41.4011 35.3971 42.3488 33.9211 42.475C32.7802 42.5726 32.3756 42.4802 32.1035 42.0603C31.633 41.3342 31.9854 40.3308 32.826 40.0029C33.2771 39.8269 35.1335 39.5054 35.7146 39.5024C36.1974 39.5 39.1613 39.0215 41.0026 38.6484C42.3034 38.3852 43.2736 37.8789 43.5316 37.3291C43.784 36.7915 43.7827 36.6806 43.52 36.2752L43.3075 35.9472L40.3072 35.9845C38.6572 36.0051 36.7814 36.0347 36.1389 36.0505Z"
                              fill="#EF4444"
                            />
                          </svg>
                          <h1 className="font-bold text-2xl">
                            Your cart is empthy
                          </h1>
                          <p className="text-gray-500 text-[15px] w-[320px] pl-2">
                            Hungry? 🍔 Add some delicious dishes to your cart
                            and satisfy your cravings!
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent
                  value="cart"
                  className="bg-white rounded-2xl mt-10 flex flex-col pb-10"
                >
                  <CartPrice empty={empty} />
                  {user ? (
                    <div className="flex items-center justify-center">
                      <Button
                        type="button"
                        disabled={empty}
                        onClick={foodAlert}
                        className="bg-orange-500 text-white w-[439px] "
                      >
                        Checkout
                      </Button>
                    </div>
                  ) : (
                    <CheckingUser />
                  )}
                </TabsContent>
                <TabsContent value="order" className="">
                  <Card className="h-[900px]">
                    <CardHeader>
                      <CardTitle className="font-bold text-2xl">
                        Order history
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid gap-3">
                        <div className="flex ">
                          <OrderList orderedFood={orderedFood} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogTitle>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
