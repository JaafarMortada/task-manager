import { useNavigate, useLocation } from "react-router-dom";
import { CustomButton } from "../components/ui"
import { motion } from "framer-motion"
import { routeEaseInLeft, routeEaseInRight } from "../framer/routeAnimations"
import { Typography } from "@material-tailwind/react";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromSignup = location.state && location.state.fromSignup;
    const variants = fromSignup ? routeEaseInRight : routeEaseInLeft;

    return (
        <motion.div variants={variants}
            initial="initial"
            animate="final"
            className="relative w-screen h-screen min-h-[390px] flex flex-col gap-5 items-center justify-center"
        >
            <div className="absolute top-0 py-3 px-3 flex w-full justify-between">
                <CustomButton
                    label="Sign Up"
                    onClick={() => navigate("/auth/signup")}
                    containerClassNames="max-w-[100px] min-w-[100px]"
                    classes="bg-transparent text-purple-500 border-b-2 border-purple-500 hover:bg-purple-500 hover:text-white hover:border-none shadow-none hover:shadow-none"
                />
                <CustomButton
                    label="Sign In"
                    onClick={() => navigate("/auth/signin")}
                    containerClassNames="max-w-[100px] min-w-[100px]"
                    classes="bg-transparent text-purple-500 border-b-2 border-purple-500 hover:bg-purple-500 hover:text-white hover:border-none shadow-none hover:shadow-none"
                />
            </div>

            <div className="flex flex-col  items-center ss:!items-end max-w-[500px] gap-4 px-3 ss:px-0">
                <Typography className="text-[24px] sm:text-[32px] md:text-[40px] font-black text-center ss:text-right" placeholder={undefined}>
                    Simplify <br /> <span className="purple__gradient">Task Management</span> <br />
                    Amplify <span className="purple__gradient">Productivity</span>
                </Typography>
                <CustomButton
                    label="Sign Up Now"
                    onClick={() => navigate("/auth/signup")}
                    classes="hover:bg-purple-700"
                    containerClassNames="!w-[200px] ss:!w-[400px]"

                />
                <Typography
                    placeholder={undefined}
                    className="italic text-[14px] max-w-[70%] text-center ss:text-right"
                >
                    Unlock the potential of your day with our intuitive task management system, making organization and productivity second nature.
                </Typography>
            </div>
        </motion.div>
    )
}

export default Home