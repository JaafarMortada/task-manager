// import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import moment from 'moment'
import { TaskResponse } from "../../api/tasks.requests";
import EditTaskStage from "../editData/EditTaskStage";

interface TaskCardProps {
    task: TaskResponse;
    updateTaskStage: (taskId: number, newStage: number) => Promise<boolean | undefined>
}

const TaskCard: React.FC<TaskCardProps> = ({ task, updateTaskStage }) => {

    const date = moment(task.due_date);
    const color = task.stage === 100 ? 'green' : (task.stage < 100 && task.stage > 0) ? 'yellow' : 'red'
    return (
        <Card
            placeholder={undefined}
            color="white"
            className={`max-w-[600px] min-w-[600px] pt-4 z-[1] px-5 rounded-none shadow-sm flex flex-row border-l-[5px] border-${color}-500 `}
        >
            <CardHeader
                placeholder={undefined}
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 z-[0] flex gap-4 items-start  min-w-[100px] pb-8 "
            >
                <div className="flex min-w-max bg-gray-500 flex-col  gap-0.5 rounded-full h-20 w-20 items-center justify-center">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" className={`text-gray-100 text-[14px]`} placeholder={undefined}>
                            {date.format('dddd')}
                        </Typography>

                    </div>
                    <Typography className={` font-extrabold text-gray-100 text-[18px] `} placeholder={undefined}>{date.format('Do')}</Typography>
                </div>

            </CardHeader>
            <CardBody placeholder={undefined} className=" z-[0] mb-6 p-0 flex flex-col gap-3">
                <div className={`flex min-w-max flex-col gap-0.5`}>

                    <div className={`flex items-center justify-between `}>
                        <Typography variant="h6" className="text-[--gray]" placeholder={undefined}>
                            Due: {date.format('dddd, MMMM Do, YYYY')}
                        </Typography>

                    </div>
                    <Typography className=" text-left font-bold text-[21px]" placeholder={undefined}>{task.title}</Typography>
                </div>
                <Typography className={` text-justify`} placeholder={undefined}>
                    {task.description}
                </Typography>

                {
                    localStorage.getItem('role') === 'employee' ?
                    <div className="flex items-center gap-5 min-h-10">
                        <EditTaskStage task={task} updateTaskStage={updateTaskStage} />
                    </div>
                    :
                    <div className="flex flex-col gap-5 min-h-10">
                        <Typography className={` text-justify`} placeholder={undefined}>
                            {task.stage === 100 ? 'Completed' : 'Pending'}
                        </Typography>
                        <Typography className={` text-justify`} placeholder={undefined}>
                            <span className="font-bold">Assigned To: </span> {task.assigned_employee.name}
                        </Typography>
                    </div>
                }
            </CardBody>
        </Card>

    )
}

export default TaskCard