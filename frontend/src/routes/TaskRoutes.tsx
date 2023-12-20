import { Route, Routes } from 'react-router-dom';

const TaskRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<div>task routes</div>} />
        </Routes>
    )
}

export default TaskRoutes