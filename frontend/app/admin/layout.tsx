import { AdminNavigation } from "./_components/AdminNavigation";
import "./globals.css";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdminNavigation />
        {children}
      </body>
    </html>
  );
}
