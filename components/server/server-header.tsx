"use client"

import { ServerWithMemberWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOutIcon, PlusCircle, Settings, TrashIcon, UserPlus, Users } from "lucide-react";
import { DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps{
    server:ServerWithMemberWithProfiles
    role?:MemberRole;
};

export const ServerHeader=({server,role}:ServerHeaderProps)=>{
    const {onOpen}=useModal();

    const isAdmin=role==MemberRole.ADMIN;
    const isModerator=isAdmin||role===MemberRole.MODERATOR;

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                {server.name}
                <ChevronDown className="h-5 w-5 ml-auto"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem onClick={()=>onOpen("invite",{server})} className="flex text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                    <DropdownMenuItem onClick={()=>onOpen("editServer",{server})} className="flex px-3 py-2 text-sm cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                    <DropdownMenuItem onClick={()=>onOpen("members",{server})} className="flex px-3 py-2 text-sm cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                        Manage Members
                        <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                {isModerator && (
                    <DropdownMenuItem onClick={()=>onOpen("createChannel",{server})} className="flex px-3 py-2 text-sm cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                {isModerator && (
                   <DropdownMenuSeparator className="border-2"/>
                )}

                {isAdmin && (
                    <DropdownMenuItem onClick={()=>onOpen("deleteServer",{server})} className="text-rose-500 flex px-3 py-2 text-sm cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                        Delete Server
                        <TrashIcon className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

                {!isAdmin && (
                    <DropdownMenuItem onClick={()=>onOpen("leaveServer",{server})} className="text-rose-500 flex px-3 py-2 text-sm cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                        Leave Server
                        <LogOutIcon className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}