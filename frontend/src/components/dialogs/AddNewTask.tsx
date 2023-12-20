import { Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react"
import { CustomButton, CustomInput } from "../ui"
import { useState } from "react"
import CustomTextArea from "../ui/CustomTextArea"

interface AddNewTaskProps {
    handleNewTask: (newTask: any) => void;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ handleNewTask }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open)
    const [data, setData] = useState({
        title: '',
        date: '',
        description: '',
    })
    const [error, setError] = useState(false)

    const [adding, setAdding] = useState(false)

    // const handleError = () => {
    //     setAdding(false)
    //     setError(true)
    //     setTimeout(() => {
    //         setError(false);
    //     }, 3000)
    // }

    const handleAddTask = async () => {
        // const res: TaskItem = await addTask(data)
        // if (res.title) {
            // setAdding(false)
            handleNewTask(data);
            setOpen(false)
        // } else {
            // handleError()
        // }
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
                            onChange={(e) => setData({ ...data, date: e.target.value })} type="date"
                        />
                    </div>
                    <div className="w-[400px]">
                        <CustomTextArea
                            label="Description"
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-center" placeholder={undefined}>
                    <CustomButton
                        label="Add Task"
                        classes={`w-[400px] ${error && 'bg-red-500'}`}
                        loading={adding}
                    onClick={handleAddTask}
                    />
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default AddNewTask