import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string }; // Make params a Promise
}

export default async function ServerIdLayout({ children, params }: ServerIdLayoutProps) {
  const profile = await currentProfile();
  if (!profile) return redirect("/sign-in");

  const { serverId } = await params; // Await params before using it

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="max-sm:hidden md:flex h-full w-72 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-72">{children}</main>
    </div>
  );
}
