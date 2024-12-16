import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AoutKrLayout",
};

export default function AoutKrLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      &copy; Next JS
    </div>
  );
}
