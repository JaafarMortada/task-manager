import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoutes, EmployersRoutes, TaskRoutes } from "./routes";
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/*" element={<AuthRoutes/>} />
        <Route path="/tasks/*" element={<TaskRoutes/>} />
        <Route path="/employer/*" element={<EmployersRoutes/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
