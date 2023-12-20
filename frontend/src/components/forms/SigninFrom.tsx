import { useState } from "react"
import { login, loginData } from "../../api/auth.requests"
import CustomInput from "../ui/CustomInput"
import CustomButton from "../ui/CustomButton"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid"
import { useNavigate } from "react-router-dom"
const SigninFrom = () => {

    const navigate = useNavigate()

    const [signinData, setSigninData] = useState<loginData>({
        email: "",
        password: "",
    })

    const [formState, setFormState] = useState("waiting-for-input")
    const [passwordInputType, setPasswordInputType] = useState<"password" | "string">("password")

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSigninData({ ...signinData, [e.target.name]: e.target.value })
    }

    const triggerPasswordVisibility = () => {
        setPasswordInputType(passwordInputType === 'password' ? 'string' : 'password')
    }

    const handleSignin = async () => {
        setFormState("loading")
        const signinResponse = await login(signinData)

        if (signinResponse.token) {
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
                label="Enter Your Email"
                name="email"
                value={signinData?.email}
                onChange={handleDataChange}

            />
            
            <CustomInput
                label="Enter Your Password"
                name="password"
                type={passwordInputType}
                value={signinData?.password}
                icon={
                    passwordInputType === "string" ?
                        <EyeSlashIcon onClick={triggerPasswordVisibility} className="cursor-pointer" />
                        :
                        <EyeIcon onClick={triggerPasswordVisibility} className="cursor-pointer" />
                }
                onChange={handleDataChange}

            />

            <CustomButton
                label={formState === "error" ? "An Error Occurred " : "SIGN UP NOW"}
                classes={formState === "error" ? "bg-red-500 " : ""}
                loading={(formState === 'loading')}
                disabled={signinData.email === "" || signinData.password === ""}
                onClick={handleSignin}
            />


        </div>
    )
}

export default SigninFrom