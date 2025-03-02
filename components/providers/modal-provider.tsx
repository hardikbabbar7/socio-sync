'use client'

import {CreateServerModal} from "@/components/modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal"
import { EditServerModal } from "../modals/edit-server-modal"
import { MembersModal } from "../modals/members-modal"
import { CreateChannelModal } from "../modals/create-channel-modal"
import { LeaveServerModal } from "../modals/leave-server-modal"
import { DeleteServerModal } from "../modals/delete-server-modal"
import { DeleteChannelModal } from "../modals/delete-channel-modal"
import { EditChannelModal } from "../modals/edit-channel-modal"
import { MessageFileModal } from "../modals/message-file"
import { DeleteMessageModal } from "../modals/delete-message-modal"

export const ModalProvider=()=>{
    return (
        <>
        <CreateServerModal/>
        <InviteModal/>
        <EditServerModal/>
        <MembersModal/>
        <CreateChannelModal/>
        <LeaveServerModal/>
        <DeleteServerModal/>
        <DeleteChannelModal/>
        <EditChannelModal/>
        <MessageFileModal/>
        <DeleteMessageModal/>
        </>
    )
}