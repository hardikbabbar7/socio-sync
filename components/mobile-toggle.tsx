import { Menu } from "lucide-react"
import {Sheet,SheetContent,SheetTitle,SheetTrigger} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { NavigationSideBar } from "./navigation/navigation-sidebar"
import { ServerSidebar } from "./server/server-sidebar"

export const MobileToggle =({serverId}:{serverId:string})=>{
    return(
        
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetTitle>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSideBar/>
                </div>
                <ServerSidebar serverId={serverId} />
            </SheetContent>
            </SheetTitle>
        </Sheet>
    )
}