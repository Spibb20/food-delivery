"use client";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { OrderedFood } from "@/lib/types";

export function OrderMap() {
  const [orders, setOrders] = useState<OrderedFood[]>([]);
  useEffect(() => {
    void (async () => {
      try {
        const res = await api.get<OrderedFood[]>("/order");
        setOrders(res.data);
      } catch (error) {
        console.error("Could not load orders", error);
      }
    })();
  }, []);
  async function updateStatus(id: string, status: OrderedFood["status"]) {
    try {
      const res = await api.patch<OrderedFood>(`/order/${id}`, { status });
      setOrders((current) => current.map((order) => order._id === id ? res.data : order));
    } catch (error) { console.error("Could not update status", error); }
  }
  return <div className="w-full h-screen bg-white"><Table>
    <TableHeader><TableRow><TableHead className="w-[100px]">№</TableHead><TableHead>Customer</TableHead><TableHead>Food</TableHead><TableHead className="text-right">Date</TableHead><TableHead className="text-right">Total</TableHead><TableHead className="text-right">Delivery Address</TableHead><TableHead className="text-right">Delivery state</TableHead></TableRow></TableHeader>
    <TableBody>
      {orders.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No orders yet</TableCell></TableRow>}
      {orders.map((order, index) => {
        const totalFoods = order.items.reduce((sum, item) => sum + item.howMuch, 0);
        return <TableRow key={order._id}>
          <TableCell className="font-medium">{index + 1}</TableCell><TableCell>{order.user}</TableCell><TableCell>{totalFoods}</TableCell>
          <TableCell className="text-right">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}</TableCell>
          <TableCell className="text-right">${order.totalPrice}</TableCell><TableCell className="text-right">{order.location}</TableCell>
          <TableCell className="text-right"><DropdownMenu><DropdownMenuTrigger asChild><Badge className="border border-orange-600 bg-white text-black px-5 py-2 font-bold">{order.status}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4.66602 10.0003L7.99935 13.3337L11.3327 10.0003M4.66602 6.00033L7.99935 2.66699L11.3327 6.00033" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" /></svg></Badge></DropdownMenuTrigger>
          <DropdownMenuContent><DropdownMenuItem onClick={() => order._id && updateStatus(order._id, "pending")}>Pending</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem onClick={() => order._id && updateStatus(order._id, "canceled")}>Canceled</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem onClick={() => order._id && updateStatus(order._id, "delivered")}>Delivered</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell>
        </TableRow>;
      })}
    </TableBody>
  </Table></div>;
}
