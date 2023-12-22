
import SigninFrom from "../../components/forms/SigninFrom"
import { Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { routeEaseInRight } from "../../framer/routeAnimations"

const SigninPage = () => {

    const navigate = useNavigate()

    return (
        <motion.div variants={routeEaseInRight}
            initial="initial"
            animate="final"
            className="flex flex-col h-screen items-center justify-center gap-3">
            <Typography className="text-4xl font-semibold text-purple-500 cursor-pointer" placeholder={undefined} onClick={()=>navigate('/')}>Welcome to Task Manager</Typography>
            <SigninFrom />
            <div className="flex max-h-fit flex-col items-center justify-center gap-1">
                <span className="text-gray-500">Don't have an account?</span>
                <button
                    onClick={() => navigate("/auth/signup")}
                    className="text-purple-500 font-semibold hover:underline"
                >
                    Sign up
                </button>
            </div>
        </motion.div>
    )
}

export default SigninPage