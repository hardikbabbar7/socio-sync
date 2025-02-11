import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const response = await initialProfile();
  let profile;

  if (response instanceof Response) {
    if (!response.ok) {
      return redirect("/sign-in");
    }
    profile = await response.json();
  } else {
    profile = response;
  }

  // If profile is null (user not authenticated or no profile exists), redirect to sign-in
  if (!profile) {
    return redirect("/sign-in");
  }

  // Now that we know profile is not null, access profile.id safely
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id, // Safe to access profile.id here
        },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  // If no server exists, show the initial modal
  return <InitialModal />;
};

export default SetupPage;