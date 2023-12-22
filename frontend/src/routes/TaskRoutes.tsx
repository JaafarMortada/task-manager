import { Route, Routes } from 'react-router-dom';
import { TasksPage } from '../pages';

const TaskRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TasksPage />} />
        </Routes>
    )
}

export default TaskRoutes