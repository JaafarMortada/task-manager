import { Route, Routes } from 'react-router-dom';

const AuthRoutes = () => {
    return ( 
        <Routes>
            <Route path="/" element={<div>auth routes</div>} />
        </Routes>
     );
}
 
export default AuthRoutes;