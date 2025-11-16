"use client";
import { useState } from "react";
import AdminOrdersPage from "./orders/page";
import AdminFoodMenuPage from "./food-menu/page";
import { AdminNavigation } from "./_components/AdminNavigation";

export default function AdminHome() {
  const [currentPage, setCurrentPage] = useState<"orders" | "food-menu">(
    "orders"
  );
  return (
    <div className="flex">
      <AdminNavigation
        onclickOrders={() => setCurrentPage("orders")}
        onclickFoodMenu={() => setCurrentPage("food-menu")}
      />
      <main className="flex-1 p-6">
        {currentPage === "orders" && <AdminOrdersPage />}
        {currentPage === "food-menu" && <AdminFoodMenuPage />}
      </main>
    </div>
  );
}
