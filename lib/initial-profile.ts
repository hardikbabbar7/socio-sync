import { redirect } from "next/navigation";
import { currentUser} from "@clerk/nextjs/server";

import {db} from "@/lib/db"

export const initialProfile=async()=>{
    const user=await currentUser();

    if(!user){
        return redirect("/sign-in");
    }

    const profile=await db.profile.findUnique({
        where:{
            id:user.id
        }
    });

    if(profile) return profile;

    const newProfile=await db.profile.create({
        data:{
            id:user.id,
            name:`${user.firstName} ${user.lastName}`,
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddress
        }
    });

    return newProfile;
};