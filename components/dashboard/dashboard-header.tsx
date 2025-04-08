import Link from "next/link";
import { UserNav } from "@/components/dashboard/user-nav";
import { ModeToggle } from "@/components/dashboard/mode-toggle";
import { Search } from "@/components/dashboard/search";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { getServerSession } from "@/lib/action";
import { redirect } from "next/navigation";

export async function DashboardHeader() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-n");
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <MobileSidebar />
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold ml-2 lg:ml-0"
        >
          <HomeIcon className="h-6 w-6" />
          <span className="hidden md:inline-block">Home</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ModeToggle />
          <UserNav session={session} />
        </div>
      </div>
    </header>
  );
}
