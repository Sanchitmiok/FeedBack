
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={"flex flex-col min-h-screen"}>
        <NavBar />
        {children}
      </body>

    </html>
  );
}
