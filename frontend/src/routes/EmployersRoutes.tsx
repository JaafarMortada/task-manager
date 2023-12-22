import { Route, Routes } from 'react-router-dom';
import { EmployeesPage } from '../pages';

const EmployersRoutes = () => {
    return ( 
        <Routes>
            <Route path="/my-employees" element={<EmployeesPage />} />
        </Routes>
     );
}
 
export default EmployersRoutes;