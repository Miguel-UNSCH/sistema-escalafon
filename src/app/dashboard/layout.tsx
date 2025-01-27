import Dashboard from "./Dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dashboard>
      {children}
    </Dashboard>
  );
}
