import { useState } from "react"
import { signup, signupData } from "../../api/auth.requests"
import CustomInput from "../ui/CustomInput"
import CustomButton from "../ui/CustomButton"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid"
import { Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
const SignupFrom = () => {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState<signupData>({
        name: "",
        email: "",
        password: "",
        role: "employer"
    })

    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [formState, setFormState] = useState("waiting-for-input")
    const [passwordInputType, setPasswordInputType] = useState<"password" | "string">("password")

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value })
    }

    const triggerPasswordVisibility = () => {
        setPasswordInputType(passwordInputType === 'password' ? 'string' : 'password')
    }

    const handleSignup = async () => {
        setFormState("loading")
        const signupResponse = await signup(signupData)

        if (signupResponse.token) {
            setFormState('success')
            navigate("/tasks")
        }
        else {
            setFormState('error')
            setTimeout(() => {
                setFormState("waiting-for-input")
            }, 2000);
        }
    }
    return (
        <div className="flex flex-col gap-3 items-center justify-center max-h-fit">
            <CustomInput
                label="Enter Your Name"
                name="name"
                value={signupData?.name}
                onChange={handleDataChange}

            />
            <CustomInput
                label="Enter Your Email"
                name="email"
                value={signupData?.email}
                onChange={handleDataChange}
            />
            <CustomInput
                label="Enter Your Password"
                name="password"
                type={passwordInputType}
                value={signupData?.password}
                icon={
                    passwordInputType === "string" ?
                        <EyeSlashIcon onClick={triggerPasswordVisibility} className="cursor-pointer" />
                        :
                        <EyeIcon onClick={triggerPasswordVisibility} className="cursor-pointer" />
                }
                onChange={handleDataChange}

            />
            <CustomInput
                label="Verify Your Password"
                type={passwordInputType}
                value={confirmedPassword}
                onChange={(e) => {
                    setConfirmedPassword(e.target.value)
                }}
            />

            <Typography
                variant="small"
                className="flex w-[400px] min-h-[21px] gap-1 text-red-500 font-normal"
                placeholder={undefined}
            >
                {
                    !!(confirmedPassword !== signupData.password) &&
                    "Please make sure the passwords match."
                }
            </Typography>

            <CustomButton
                label={formState === "error" ? "An Error Occurred " : "SIGN UP NOW"}
                classes={formState === "error" ? "bg-red-500 " : ""}
                loading={(formState === 'loading')}
                disabled={(confirmedPassword !== signupData.password) || signupData.name === "" || signupData.email === "" || signupData.password === ""}
                onClick={handleSignup}
            />


        </div>
    )
}

export default SignupFrom