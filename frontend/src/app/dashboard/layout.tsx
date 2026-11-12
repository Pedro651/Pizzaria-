import { requireAdmin } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobileSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="flex h-screen overflow-hidden text-black">
      {/* Sidebar DESKTOP */}
      <Sidebar userName={user.name} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* HEADER MOBILE */}
        <MobileSidebar />

        <main className="flex-1 overflow-y-auto bg-[#F5F1E8]">
          <div className="container max-w-full px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
