import { Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react"
import { CustomButton, CustomInput } from "../ui"
import { useState } from "react"
import CustomTextArea from "../ui/CustomTextArea"
import { TaskData, TaskResponse, addTask } from "../../api/tasks.requests";
import moment from "moment";
import { AxiosError } from "axios";

interface AddNewTaskProps {
    handleNewTask: (newTask: TaskResponse) => void;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ handleNewTask }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open)
    const [data, setData] = useState<TaskData>({
        title: '',
        due_date: new Date(),
        stage: 0,
        description: '',
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

    const handleAddTask = async () => {
        setFormState('loading')
        try {
            const newTask = await addTask(data)
            if (newTask !== null && typeof newTask === "object" && !(newTask.hasOwnProperty('message'))) {
                handleNewTask(newTask as TaskResponse);
                setOpen(false)
            } else if (newTask instanceof AxiosError) {
                if (newTask instanceof AxiosError && newTask.response && newTask.response.data && newTask.response.data.error) {
                    handleError(newTask.response.data.error.toString());
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
            <CustomButton label="Add New Task" classes='' onClick={handleOpen} containerClassNames="w-[220px]" />
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
                        Add New Task
                    </Typography>
                </DialogHeader>
                <DialogBody className={`py-5 max-h-[450px] overflow-auto flex flex-col items-center gap-5`} placeholder={undefined}>
                    <div className="w-[400px]">
                        <CustomInput
                            label="Task Title"
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </div>
                    <div className="w-[400px]">
                        <CustomInput
                            label="Due Data"
                            onChange={(e) => setData({ ...data, due_date: moment(e.target.value, 'YYYY-MM-DD').format('YYYY-MM-DD') })}
                            type="date"
                        />
                    </div>
                    <div className="w-[400px]">
                        <CustomTextArea
                            label="Description"
                            onChange={(e) => setData({ ...data, description: e.target.value })}
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
                        label="Add Task"
                        classes={`w-[400px] ${formState === "error" && 'bg-red-500'}`}
                        loading={formState === 'loading'}
                        onClick={handleAddTask}
                        disabled={data.title === '' || data.due_date === '' || data.description === ''}
                    />
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default AddNewTask