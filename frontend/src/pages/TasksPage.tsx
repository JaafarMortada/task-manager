import { StickyNavbar } from "../components/ui/Navbar"
import TaskCard from "../components/cards/TaskCard"
import CustomSelect from "../components/ui/CustomSelect";
import { useState } from "react";
import CustomButton from "../components/ui/CustomButton";

const dummyData = [
    {
        id: 1,
        date: '2023-12-25T12:00:00Z',
        title: 'Plan Holiday Celebration',
        notes: 'Prepare for a joyful holiday celebration with friends and family.',
        stage: 100,
    },
    {
        id: 2,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 50,
    },
    {
        id: 3,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 0,

    },
    {
        id: 4,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 50,

    },
    {
        id: 5,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 50,

    },
    {
        id: 6,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 100,

    },
    {
        id: 7,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 0,

    },
    {
        id: 8,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 50,

    },
    {
        id: 9,
        date: '2023-12-30T10:30:00Z',
        title: 'Meeting with Clients',
        notes: 'Discuss upcoming projects and finalize client requirements.',
        stage: 100,

    },
];

const TasksPage = () => {

    const [tasks, setTasks] = useState(dummyData)

    const taskFilteringHandler = (filter: "all" | "completed" | "incomplete") => {
        switch (filter) {
            case "all":
                setTasks(dummyData)
                break;
            case "completed":
                setTasks(dummyData.filter(task => task.stage === 100))
                break;
            case "incomplete":
                setTasks(dummyData.filter(task => task.stage > 0 && task.stage < 100))
                break;
            default:
                setTasks(dummyData)
                break;
        }
    }

    return (
        <div className="flex flex-col items-center">
            <StickyNavbar />
            <div className="z-[998] flex sm:flex-row flex-col sm:justify-between justify-center gap-5 items-center py-4 sticky top-[61px] lg:top-[68px] max-w-[calc(100%-20px)] min-w-[calc(100%-20px)] rounded-b-md purple__glass px-4 lg:px-8 lg:py-3 ">
                <CustomSelect
                    label={"Filter tasks"}
                    options={[
                        { value: "all", label: "All" },
                        { value: "completed", label: "Completed" },
                        { value: "incomplete", label: "Incomplete" },
                    ]}
                    onChange={(e) => {
                        taskFilteringHandler(e as any)}}
                    value={"all"}
                    classNames=" w-[250px] z-[999]"
                />
                <CustomButton label="Add Task" containerClassNames="w-[220px]"/>
            </div>
            <div className="flex flex-col z-[2] gap-2 mt-2 items-center mb-5">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>

        </div>
    )
}

export default TasksPage