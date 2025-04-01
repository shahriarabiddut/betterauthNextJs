"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BarChart3,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        {/* Added SheetTitle for accessibility (visually hidden) */}
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>

        <div className="flex h-16 items-center border-b px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard className="h-6 w-6" />
            <span>Dashboard</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1 px-2 text-sm font-medium">
              <Button
                variant="ghost"
                className="justify-start gap-2"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard/newpage">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="#">
                  <Users className="h-4 w-4" />
                  Customers
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="#">
                  <FileText className="h-4 w-4" />
                  Reports
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="#">
                  <Mail className="h-4 w-4" />
                  Messages
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="#">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href="#">
                  <HelpCircle className="h-4 w-4" />
                  Help
                </Link>
              </Button>
            </nav>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
