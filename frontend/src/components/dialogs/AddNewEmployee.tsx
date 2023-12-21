import { Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react"
import { CustomButton, CustomInput } from "../ui"
import { useState } from "react"
import { AxiosError } from "axios";
import { Employee, EmployeeData, addEmployee } from "../../api/users.requests";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

interface AddNewEmployeeProps {
    handleNewEmployee: (newEmployee: Employee) => void;
    buttonLabel: string;
    buttonWidth: string;
}

const AddNewEmployee: React.FC<AddNewEmployeeProps> = ({ handleNewEmployee, buttonLabel, buttonWidth }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open)
    const [passwordInputType, setPasswordInputType] = useState<"password" | "string">("password")

    const [data, setData] = useState<EmployeeData>({
        name: '',
        email: '',
        password: '',

    })
    const [formState, setFormState] = useState('waiting-for-input')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleError = (error: string) => {
        setFormState("error")
        setErrorMessage(error)
        setTimeout(() => {
            setFormState("waiting-for-input")

        }, 3000);
    }

    const triggerPasswordVisibility = () => {
        setPasswordInputType(passwordInputType === 'password' ? 'string' : 'password')
    }

    const handleAddEmployee = async () => {
        setFormState('loading')
        try {
            const newEmployee = await addEmployee(data)
            if (newEmployee !== null && typeof newEmployee === "object" && !(newEmployee.hasOwnProperty('message'))) {
                handleNewEmployee(newEmployee as Employee);
                setOpen(false)
            } else if (newEmployee instanceof AxiosError) {
                if (newEmployee instanceof AxiosError && newEmployee.response && newEmployee.response.data && newEmployee.response.data.error) {
                    handleError(newEmployee.response.data.error.toString());
                } else {
                    handleError('Something went wrong');
                }

            }
        } catch (error) {
            handleError('Something went wrong');
        }
    }

    return (
        <>
            <CustomButton label={buttonLabel} classes='' onClick={handleOpen} containerClassNames={`${buttonWidth}`} />
            <Dialog size={"md"} open={open} handler={handleOpen}
                className=""
                placeholder={undefined}
            >
                <DialogHeader
                    className={`flex w-full justify-center items-center`} placeholder={undefined}
                >
                    <Typography
                        className={`mt-1 w-full flex items-center justify-center gap-1  font-normal`} placeholder={undefined}
                        variant="h2"
                    >
                        Add New Employee
                    </Typography>
                </DialogHeader>
                <DialogBody className={`py-5 max-h-[450px] overflow-auto flex flex-col items-center gap-5`} placeholder={undefined}>
                    <div className="w-[400px]">
                        <CustomInput
                            label="Enter Employee's name"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <div className="w-[400px]">
                        <CustomInput
                            label="Enter Employee's Email"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className="w-[400px]">
                        <CustomInput
                            label="Enter Employee's Password"
                            name="password"
                            type={passwordInputType}
                            value={data.password}
                            icon={
                                passwordInputType === "string" ?
                                    <EyeSlashIcon onClick={triggerPasswordVisibility} className="cursor-pointer" />
                                    :
                                    <EyeIcon onClick={triggerPasswordVisibility} className="cursor-pointer" />
                            }
                            onChange={(e) => setData({ ...data, password: e.target.value })}

                        />
                    </div>
                    <Typography
                        variant="small"
                        className="flex w-[400px] min-h-[42px] gap-1 text-red-500 font-normal"
                        placeholder={undefined}
                    >
                        {
                            errorMessage
                        }
                    </Typography>
                </DialogBody>
                <DialogFooter className="flex justify-center" placeholder={undefined}>
                    <CustomButton
                        label="Add Employee"
                        classes={`w-[400px] ${formState === "error" && 'bg-red-500'}`}
                        loading={formState === 'loading'}
                        onClick={handleAddEmployee}
                        disabled={data.name === '' || data.email === '' || data.password === ''}
                    />
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default AddNewEmployee