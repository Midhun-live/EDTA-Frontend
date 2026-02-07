import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="w-full border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">EDTA</h1>
          <nav className="space-x-4">
            <Link href="/signup">Signup</Link>
            <Link href="/login">Login</Link>
            <Link href="/home">Home</Link>
          </nav>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
