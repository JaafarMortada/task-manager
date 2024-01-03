import { Slider, Progress } from "@material-tailwind/react"
import React, { useState } from "react"
import { CustomButton } from "../ui"
import { TaskResponse } from "../../api/tasks.requests"

interface EditTaskStageProps {
    task: TaskResponse;
    updateTaskStage: (taskId: number, newStage: number) => Promise<boolean | undefined>
}
const EditTaskStage: React.FC<EditTaskStageProps> = ({ task, updateTaskStage }) => {
    const [stage, setStage] = useState<number>(task.stage)
    const [editing, setEditing] = useState<boolean>(false)
    const [updatingState, setUpdatingState] = useState<string>('waiting-for-input')
    const handleError = () => {
        setUpdatingState("error")
        setTimeout(() => {
            setUpdatingState("waiting-for-input")

        }, 3000);
    }
    return (
        <>
            {
                editing ?
                    <Slider key={`${task.id}-${task.stage}`} defaultValue={stage}
                        onChange={(e) => {
                            setStage(parseInt(e.target.value))

                        }}
                        placeholder={undefined}
                        className="min-w-48 max-w-48"
                        color={stage === 100 ? 'green' : (stage < 100 && stage > 0 ? "yellow" : "red")}

                    />
                    :
                    <Progress value={task.stage} label="done" className="min-w-48 max-w-48" placeholder={undefined} color={task.stage === 100 ? 'green' : (task.stage < 100 && task.stage > 0 ? "yellow" : "red")} />
            }
            {
                editing ?
                    <>
                        <CustomButton
                            label="confirm" containerClassNames="max-w-[100px]"
                            classes={`text-[12px] font-thin p-2 ${updatingState === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
                            loading={updatingState === 'updating'}
                            
                            onClick={async () => {
                                setUpdatingState('updating')
                                const updated = await updateTaskStage(task.id, stage);
                                if (updated) {
                                    setUpdatingState('waiting-for-input')
                                    setEditing(false)
                                } else {
                                    handleError()
                                }
                            }
                            }
                        />
                        <CustomButton label="cancel" containerClassNames="max-w-[100px]" classes="text-[12px] bg-red-500 font-thin p-2" onClick={() => setEditing(false)} />
                    </>

                    :
                    <CustomButton label="edit" containerClassNames="max-w-[100px]" classes="text-[12px] font-thin p-2" onClick={() => setEditing(true)} />
            }
        </>
    )
}

export default EditTaskStage