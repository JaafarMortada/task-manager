import { AnimatePresence } from "framer-motion";

export function LocationProvider({ children }: { children: React.ReactNode }): (JSX.Element | null) {
    return <AnimatePresence>{children}</AnimatePresence>;
}
