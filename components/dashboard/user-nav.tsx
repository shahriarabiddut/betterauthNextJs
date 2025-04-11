"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/lib/better-auth/auth-types";
import { CreditCard, Edit, LifeBuoy, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNav({ session }: { session: Session }) {
  const { name, email } = session?.user;
  const proPic = session?.user?.image || "";
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/"); // Redirect after sign out
  };
  // const session = await getServerSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={proPic} alt="@user" />
            <AvatarFallback>
              {!proPic &&
                name
                  .split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={"/dashboard/profile"}
              className="cursor-pointer flex items-center justify-start gap-2 w-full"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={"/dashboard/profile/edit"}
              className="cursor-pointer flex items-center justify-start gap-2 w-full"
            >
              {" "}
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={handleSignOut}
            className="cursor-pointer flex items-center justify-start gap-2 w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
