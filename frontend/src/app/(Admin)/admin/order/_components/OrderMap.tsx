"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { OrderedFood } from "@/lib/types";

export function OrderMap() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [orders, setOrders] = useState<OrderedFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      setErrorMessage("Please sign in as an admin to view orders.");
      return;
    }
    void (async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        const token = await getToken();
        const res = await api.get<OrderedFood[]>("/order", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Could not load orders", error);
        setErrorMessage(
          "Could not load orders. Check ADMIN_USER_IDS and Clerk login."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken, isLoaded, isSignedIn]);

  async function updateStatus(id: string, status: OrderedFood["status"]) {
    try {
      const token = await getToken();
      const res = await api.patch<OrderedFood>(
        `/order/${id}`,
        { status },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );
      setOrders((current) =>
        current.map((order) => (order._id === id ? res.data : order))
      );
    } catch (error) {
      console.error("Could not update status", error);
    }
  }

  return (
    <div className="w-full overflow-hidden rounded-b-2xl bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">№</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead className="text-right">Delivery state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                Loading orders...
              </TableCell>
            </TableRow>
          )}
          {!loading && errorMessage && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-red-500">
                {errorMessage}
              </TableCell>
            </TableRow>
          )}
          {!loading && !errorMessage && orders.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No orders yet
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            !errorMessage &&
            orders.map((order, index) => {
              const totalFoods = order.items.reduce(
                (sum, item) => sum + item.howMuch,
                0
              );
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="max-w-[190px] truncate">
                    {order.user}
                  </TableCell>
                  <TableCell>{totalFoods} item(s)</TableCell>
                  <TableCell>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell className="max-w-[260px] truncate">
                    {order.location}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Badge className="cursor-pointer border border-orange-500 bg-white px-4 py-2 font-bold capitalize text-black hover:bg-orange-50">
                          {order.status}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            order._id && updateStatus(order._id, "pending")
                          }
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            order._id && updateStatus(order._id, "canceled")
                          }
                        >
                          Canceled
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            order._id && updateStatus(order._id, "delivered")
                          }
                        >
                          Delivered
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
