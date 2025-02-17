export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="place-items-center grid bg-[#eff1f5] min-h-screen font-poppins">{children}</div>;
}
