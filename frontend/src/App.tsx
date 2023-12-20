import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoutes, TaskRoutes } from "./routes";
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/*" element={<AuthRoutes/>} />
        <Route path="/task/*" element={<TaskRoutes/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
