"use client";

import { api } from "@/lib/api";
import { FoodsTypes, OrderedFood, OrderItem } from "@/lib/types";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type OrderContextType = {
  orderedFood: OrderedFood[];
  cart: OrderItem[];
  addToCart: (dish: FoodsTypes, howMuch: number) => void;
  updateQuantity: (foodId: string, howMuch: number) => void;
  cancel: (foodId: string) => void;
  clearCart: () => void;
  refreshOrders: () => Promise<void>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderFoodAuth({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const userId = user?.id;
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orderedFood, setOrderedFood] = useState<OrderedFood[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (error) {
      console.error("Could not restore cart", error);
    } finally {
      setCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (cartLoaded) window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, cartLoaded]);

  async function refreshOrders() {
    if (!isLoaded) return;
    if (!isSignedIn || !userId) {
      setOrderedFood([]);
      return;
    }
    try {
      const token = await getToken();
      const res = await api.get<OrderedFood[]>(`/order/user/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setOrderedFood(res.data);
    } catch (error) {
      console.error("Could not load order history", error);
    }
  }

  useEffect(() => {
    void refreshOrders();
  }, [isLoaded, isSignedIn, userId]);

  const addToCart = (dish: FoodsTypes, howMuch: number) => {
    const quantity = Math.max(1, howMuch);
    setCart((previous) => {
      const existing = previous.find((item) => item.foodId === dish._id);
      if (existing)
        return previous.map((item) =>
          item.foodId === dish._id
            ? { ...item, howMuch: item.howMuch + quantity }
            : item
        );
      return [
        ...previous,
        {
          _id: dish._id,
          foodId: dish._id,
          name: dish.food,
          price: dish.price,
          howMuch: quantity,
          ingredients: dish.ingredients,
          image: dish.image,
        },
      ];
    });
  };

  const updateQuantity = (foodId: string, howMuch: number) => {
    if (howMuch < 1) return;
    setCart((previous) =>
      previous.map((item) =>
        item.foodId === foodId ? { ...item, howMuch } : item
      )
    );
  };
  const cancel = (foodId: string) =>
    setCart((previous) => previous.filter((item) => item.foodId !== foodId));
  const clearCart = () => setCart([]);

  return (
    <OrderContext.Provider
      value={{
        orderedFood,
        cart,
        addToCart,
        updateQuantity,
        cancel,
        clearCart,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderFoodAuth");
  return context;
}
