import { useState } from "react"
import SignupFrom from "../components/forms/SignupFrom"
import SigninFrom from "../components/forms/SigninFrom"
import { Typography, Spinner } from "@material-tailwind/react"

const AuthPage = () => {

    const [form, setForm] = useState<"login" | "signup">("login")
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-3">
            <Typography className="text-4xl font-semibold text-purple-500" placeholder={undefined}>Welcome to Task Manager</Typography>
            {loading ? <Spinner className="w-16 h-16" color="purple" /> :
                form === 'login' ? <SigninFrom /> : <SignupFrom />
            }
            <div className="flex max-h-fit flex-col items-center justify-center gap-1">
                <span className="text-gray-500">Don't have an account?</span>
                <button
                    onClick={() => {
                            setForm(form === 'login' ? 'signup' : 'login')
                            setLoading(true)
                            setTimeout(() => {
                                setLoading(false)
                            }, 500);
                        }
                    }
                    className="text-purple-500 font-semibold hover:underline"
                >
                    {form === "login" ? "Sign up" : "Sign in"}
                </button>
            </div>
        </div>
    )
}

export default AuthPage