import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LocationProvider } from '../framer/LocationProvider';
import { SigninPage, SignupPage } from '../pages';
const AuthRoutes = () => {
    const location = useLocation();

    return (
        <LocationProvider>
            <Routes location={location} key={location.key}>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </LocationProvider>

    );
}

export default AuthRoutes;