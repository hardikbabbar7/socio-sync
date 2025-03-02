"use client";

import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store";
import qs from "query-string"
import { useState } from "react";
import axios from "axios";
import { UserAvatar } from "../user-avatar";
import { ServerWithMemberWithProfiles } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Shield,MoreVertical, ShieldCheck, ShieldQuestion, Check, Gavel, Loader2 } from "lucide-react";
import { DropdownMenu,DropdownMenuContent,DropdownMenuSeparator,DropdownMenuPortal,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuTrigger,DropdownMenuSubTrigger } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";


export const MembersModal=()=>{
    const {onOpen,isOpen,onClose,type,data}=useModal();
    const router=useRouter();
    const [loadingId,setloadingId]=useState("");

    const onKick=async(memberId:string)=>{
        try{
            setloadingId(memberId)
            const url=qs.stringifyUrl({
                url:`/api/members/${memberId}`,
                query:{
                    serverId:server?.id,
                }
            });

            const response=await axios.delete(url);
            router.refresh()
            onOpen("members",{server:response.data})
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloadingId("")
        }
    }

    const onRoleChange=async(memberId:string,role:MemberRole)=>{
        try{
            setloadingId(memberId);
            const url=qs.stringifyUrl({
                url:`/api/members/${memberId}`,
                query:{
                    serverId:server?.id,
                }
            });

            const response=await axios.patch(url,{role})
            router.refresh()
            onOpen("members",{server:response.data})
        }
        catch(error){
            console.log(error)
        }
        finally{
            setloadingId("")
        }
    }

    const isModalOpen=isOpen && type==="members";
    const {server}=data as {server:ServerWithMemberWithProfiles};
    const roleIconMap={
        "GUEST":null,
        "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
        "ADMIN":<ShieldCheck className="h-4 w-4 ml-2 text-rose-500"/>,
    }


    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white font-bold text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 font-semibold">
                    {server?.members?.length} Members
                </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member)=>(
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}/>
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile.name}
                                {roleIconMap[member.role]}
                                </div>
                                <p className="text-sm text-zinc-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId!==member.profileId && loadingId!==member.id && <div className="ml-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical className="h-6 w-6 text-lg text-zinc-500"/>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="left">
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className="flex items-center">
                                            <ShieldQuestion className="w-4 h-4 mr-2"/>
                                            <span>Role</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent className="space-y-2">
                                                <DropdownMenuItem onClick={()=>onRoleChange(member.id,"GUEST")} className="flex items-center">
                                                    <Shield className="h-4 w-4 mr-2"/>
                                                    Guest
                                                    {member.role==="GUEST" && (
                                                        <Check className="h-4 w-4 ml-auto"/>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>onRoleChange(member.id,"MODERATOR")} className="flex items-center">
                                                    <ShieldCheck className="h-4 w-4 mr-2"/>
                                                    Moderator
                                                    {member.role==="MODERATOR" && (
                                                        <Check className="h-4 w-4 ml-auto"/>
                                                    )}
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={()=>onKick(member.id)}className="pl-2 flex items-center text-left space-x-2 py-1">
                                        <Gavel className="h-4 w-4" />
                                        <span className="pl-2 text-sm">Kick</span>
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </div>}
                                {loadingId==member.id && (<Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>)}
                        </div>
                    ))}
                </ScrollArea>
                
            </DialogContent>
        </Dialog>
    )
}