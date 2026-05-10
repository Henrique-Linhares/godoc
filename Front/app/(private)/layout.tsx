import Providers from "@/app/components/Providers/Providers";

import Header from "../components/Structure/Header/Header";
import Footer from "../components/Structure/Footer/Footer";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
        {children}
    </Providers>
  )
}