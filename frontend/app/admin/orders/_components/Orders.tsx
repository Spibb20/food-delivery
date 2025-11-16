import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
export const Orders = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};
