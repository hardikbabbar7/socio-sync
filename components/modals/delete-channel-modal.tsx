"use client";

import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteChannelModal=()=>{
    const {isOpen,onClose,type,data}=useModal();
    const router=useRouter();

    const isModalOpen=isOpen && type==='deleteChannel';
    const {server,channel}=data;

    const [isLoading,setisLoading]=useState(false);

    const onClick=async()=>{
        try{
            setisLoading(true);
            const url=qs.stringifyUrl({
                url:`/api/channels/${channel?.id}`,
                query:{
                    serverId:server?.id
                }
            })

            await axios.delete(url);
            onClose();
            router.push(`/servers/${server?.id}`)
            router.refresh()
        }
        catch(error){
            console.log(error)
        }
        finally{
            setisLoading(false)
        }
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white p-2 font-bold text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                        <DialogDescription className="text-center text-zinc-500">
                            Are you sure you want to do this?<br/>
                            <span className="font-bold text-indigo-500">#{channel?.name}</span> will be permanently deleted.
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="primary">Cancel</Button>
                        <Button disabled={isLoading} variant="primary" onClick={onClick}>Confirm</Button>
                    </div>
                    
                </DialogFooter>
                
            </DialogContent>
        </Dialog>
    )
}