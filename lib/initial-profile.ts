import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const initialProfile = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.redirect('/sign-in');
        }

        // Check if the user already has a profile
        const profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        });

        if (profile) {
            return profile;  // Return existing profile if found
        }

        // If no profile exists, create a new one
        const newProfile = await db.profile.create({
            data: {
                //id : user.id
                userId: user.id,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                imageUrl: user.imageUrl || '',  // Fallback if no image URL
                email: user.emailAddresses?.[0]?.emailAddress || '',  // Fallback if no email
            }
        });

        return newProfile;
    } catch (error) {
        console.error("Error fetching or creating profile:", error);
        return NextResponse.error();  // Return an error response if something goes wrong
    }
}
