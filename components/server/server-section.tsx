"use client";

import { ServerWithMemberWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps{
    label:string;
    role?:MemberRole;
    sectionType:"channels"|"members";
    channelType?:ChannelType;
    server?:ServerWithMemberWithProfiles

}

export const ServerSection=({
    label,role,sectionType,channelType,server
}:ServerSectionProps)=>{
    const {onOpen}=useModal();
    return (
        <div className="flex justify-between items-center py-2">
            <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role!==MemberRole.GUEST && sectionType==="channels" &&(
                <ActionTooltip label="Create Channel" side="top">
                    <button onClick={()=>{onOpen("createChannel",{channelType})}}className="text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="font-bold h-5 w-5"/>
                    </button>
                </ActionTooltip>
            )}

            {role===MemberRole.ADMIN && sectionType==="members" &&(
                <ActionTooltip label="Manage Members" side="top">
                    <button onClick={()=>{onOpen("members",{server})}}className="text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Settings className="font-bold h-5 w-5"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}