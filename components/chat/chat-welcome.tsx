import { Hash } from "lucide-react";

interface ChatWelcomeProps{
    name:string;
    type:"channel"|"conversation"
}

const ChatWelcome = ({name,type}:ChatWelcomeProps) => {
    return ( <div className="space-y-2 px-4 mb-4">
        {type==="channel" &&(
            <div className="flex flex-col space-y-4">
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
                    <Hash className="h-12 w-12 text-white"/>
                </div>
            </div>
        )}
        <p className="pl-2 text-xl md:text-3xl font-bold">
        {type==="channel"?`Welcome to #`:""}{name}
        </p>
        <p className="pl-2 text-zinc-600 dark:text-zinc-400 text-md font-semibold">
            {type==="channel"?`This is the start of the #${name} channel.`:`This is the start of your conversation with ${name}`}
        </p>

    </div> );
}
 
export default ChatWelcome;