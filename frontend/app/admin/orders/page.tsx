"use client";

import { Orders } from "./_components/Orders";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  /* const [orders, setOrders] = useState<any[]>([]);
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/orders");
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);*/

  /*useEffect(() => {
    if (selectedOrders.length === Orders.length && Orders.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedOrders  orders ])*/

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <div className="border rounded-xl overflow-hidden shadow-sm p-2.5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Input
                  className="size-3 accent-black"
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectAll(checked);
                    if (checked) {
                      //bugdiin songoh logic hiigdene selectedOrder state ashiglana
                    } else {
                      setSelectedOrders([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>№</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Food</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input
                  className="size-3 accent-black"
                  type="checkbox"
                  /*checked=selectedOrders*/ onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      // setSelectedOrders hiine
                    } else {
                      //setSelectedOrders filter hiine
                    }
                  }}
                />
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell>bb@gmail.com</TableCell>
              <TableCell>Ordered Foods</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>
                <Badge></Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-end items-center mt-4 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-70"
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            disabled={page === 10}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
