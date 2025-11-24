"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useAuth } from "@/context/user.provider";
import { useUser } from "@clerk/nextjs";
export function User() {
  const { logout } = useAuth();
  const { user } = useUser();
  return (
    <div className="absolute right-9 top-0">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxWdv-0xmpT8Y6IoN2HXvpoQTEX2yHNf7JZw&s"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] rounded-2xl flex flex-col items-center justify-center">
          <DropdownMenuItem>
            {user?.primaryEmailAddress?.emailAddress}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={logout}>Sign out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
