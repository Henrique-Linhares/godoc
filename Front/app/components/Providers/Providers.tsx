import SafeRouter from "@/app/SafeRouter/SafeRouter";

import { SearchProvider } from "@/context/Search";
import { Children } from "react";


type Props = {
    children: React.ReactNode
}


function Providers({ children }: Props) {
    return (
            <SafeRouter>
                <SearchProvider>
                    {children}
                </SearchProvider>
            </SafeRouter>
    )
}

export default Providers

