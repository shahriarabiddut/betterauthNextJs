import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  FileText,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DashboardSidebar() {
  return (
    <aside className="hidden border-r bg-muted/40 lg:block lg:w-64">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="flex h-full flex-col gap-2 p-4">
          <nav className="grid gap-1 px-2 text-sm font-medium">
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/dashboard/newpage">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <Users className="h-4 w-4" />
                Customers
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <FileText className="h-4 w-4" />
                Reports
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <Mail className="h-4 w-4" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="#">
                <HelpCircle className="h-4 w-4" />
                Help
              </Link>
            </Button>
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
}
