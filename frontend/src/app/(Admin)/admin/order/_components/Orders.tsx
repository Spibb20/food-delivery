export function Orders() {
  return (
    <div className="w-full rounded-t-2xl bg-white px-10 py-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-400">
            Manage customer delivery orders
          </p>
        </div>
        <div className="rounded-xl border bg-slate-50 px-4 py-2 text-sm text-slate-600">
          Latest orders first
        </div>
      </div>
    </div>
  );
}
export function OrdersList() {
  return <div />;
}
