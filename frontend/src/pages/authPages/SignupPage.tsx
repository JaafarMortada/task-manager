
import { Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import SignupFrom from "../../components/forms/SignupFrom"
import { motion } from "framer-motion"
import { routeEaseInLeft } from "../../framer/routeAnimations"

const SignupPage = () => {

    const navigate = useNavigate()

    return (
        <motion.div variants={routeEaseInLeft}
            initial="initial"
            animate="final"
            className="flex flex-col h-screen items-center justify-center gap-3">
            <Typography className="text-4xl font-semibold text-purple-500 cursor-pointer" placeholder={undefined} onClick={()=>navigate('/', { state: { fromSignup: true } })}>Welcome to Task Manager</Typography>
            <SignupFrom />
            <div className="flex max-h-fit flex-col items-center justify-center gap-1">
                <span className="text-gray-500">Don't have an account?</span>
                <button
                    onClick={() => navigate("/auth/signin")}
                    className="text-purple-500 font-semibold hover:underline"
                >
                    Sign in
                </button>
            </div>
        </motion.div>
    )
}

export default SignupPage