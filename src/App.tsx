import Logo from "@/assets/Logo.svg";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import BitcoinTransactions from "@/components/bitcoin-transactions"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {EXAMPLE_USER} from "@/constants";

const queryClient = new QueryClient()

export default function App() {

   return ( <QueryClientProvider client={queryClient}>
        <nav className={"w-full h-20  px-8 flex justify-between items-center p-2"}>
            <a href="https://relai.app">
                <img src={Logo} alt="logo" />
            </a>
            <div className={"flex p-2 items-center gap-2"}>
                {/*TODO:Change mockup data on prod*/}
                <Avatar>
                    <AvatarImage src={EXAMPLE_USER.avatar}/>
                    <AvatarFallback>{EXAMPLE_USER.username.slice(0,1)}</AvatarFallback>
                </Avatar>
                <p className={"font-semibold"}>{EXAMPLE_USER.username}</p>
            </div>
        </nav>
        <BitcoinTransactions/>
    </QueryClientProvider>)

}