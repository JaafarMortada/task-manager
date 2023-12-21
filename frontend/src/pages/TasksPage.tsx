import { StickyNavbar } from "../components/ui/Navbar"
import TaskCard from "../components/cards/TaskCard"
import CustomSelect from "../components/ui/CustomSelect";
import { useEffect, useState } from "react";
import AddNewTask from "../components/dialogs/AddNewTask";
import { TaskResponse, getTasks } from "../api/tasks.requests";
import { Spinner } from "@material-tailwind/react";

type filter = "all" | "completed" | "incomplete" | "in-progress"

const TasksPage = () => {

    const [tasks, setTasks] = useState<TaskResponse[]>([])
    const [filteredTasks, setFilteredTasks] = useState<TaskResponse[]>(tasks)
    const [tasksState, setTasksState] = useState('loading')

    const taskFilteringHandler = (filter: filter) => {
        switch (filter) {
            case "all":
                setFilteredTasks(tasks)
                break;
            case "completed":
                setFilteredTasks(tasks.filter(task => task.stage === 100))
                break;
            case "in-progress":
                setFilteredTasks(tasks.filter(task => task.stage > 0 && task.stage < 100))
                break;
            case "incomplete":
                setFilteredTasks(tasks.filter(task => task.stage === 0))
                break;
            default:
                setFilteredTasks(tasks)
                break;
        }
    }

    const handleGetTasks = async () => {
        setTasksState('loading')
        try {
            const tasksResponse = await getTasks()
            if (
                Array.isArray(tasksResponse) &&
                tasksResponse.every((item) => typeof item === "object" && item !== null)
              ) {
                setTasks(tasksResponse);
                setFilteredTasks(tasksResponse)
              } else {
                setTasks([]);
              }       
        } catch (error) {
            setTasksState('error')
        } finally {
            setTasksState('success')
        }
    }

    useEffect(() => {
      handleGetTasks()

    }, [])
    

    return (
        <div className="flex flex-col items-center">
            <StickyNavbar />
            <div className="z-[998] flex sm:flex-row flex-col sm:justify-between justify-center gap-5 items-center py-4 sticky top-[61px] lg:top-[68px] max-w-[calc(100%-20px)] min-w-[calc(100%-20px)] rounded-b-md purple__glass px-4 lg:px-8 lg:py-3 ">
                <CustomSelect
                    label={"Filter tasks"}
                    options={[
                        { value: "all", label: "All" },
                        { value: "completed", label: "Completed" },
                        { value: "in-progress", label: "In Progress" },
                        { value: "incomplete", label: "Incomplete" },
                    ]}
                    onChange={(e) => {
                        taskFilteringHandler(e as filter)
                    }}
                    value={"all"}
                    classNames=" w-[250px] z-[999]"
                />
                {localStorage.getItem('role') === 'employer' && <AddNewTask handleNewTask={(task) => {setFilteredTasks([task, ...tasks]); setTasks([task, ...tasks])}} />}
            </div>
            <div className="flex flex-col z-[2] gap-2 mt-2 items-center min-h-[calc(100vh-200px)] mb-5">
                {
                    tasksState === "loading" ?
                        <Spinner color="purple" className="h-16 w-16 my-auto" /> :
                        tasksState === "error" ?
                            <p className="text-red-500 my-auto">Error while fetching tasks</p> :
                        filteredTasks.length === 0 ?
                            <p className="text-purple-500 my-auto">No Tasks To Show</p> :
                        filteredTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
            </div>

        </div>
    )
}

export default TasksPage