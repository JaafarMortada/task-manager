import { useEffect, useState } from "react";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse
} from "@material-tailwind/react";
import CustomButton from "./CustomButton";
import { logout } from "../../api/auth.requests";
import { useNavigate } from "react-router-dom";

export function StickyNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate()
    const handleLogout = async () => {
        if (await logout()) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/auth")
        }
    }
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                placeholder={undefined}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                onClick={() => navigate("/employer/my-employees")}
            >
                <span className="flex items-center cursor-pointer">
                    Employees
                </span>
            </Typography>
            <Typography
                placeholder={undefined}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                onClick={() => navigate("/tasks")}
            >
                <span className="flex items-center cursor-pointer">
                    Tasks
                </span>
            </Typography>
        </ul>
    );

    return (
        <Navbar placeholder={undefined} className="sticky top-2 opacity-95 z-10 h-max max-w-[calc(100%-20px)] rounded-t-md rounded-b-none px-4 py-1 mb-2 lg:px-8 lg:py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    placeholder={undefined}
                    color="purple"
                    className="mr-4 py-1.5 font-bold text-[21px]"
                >
                    Task Manager
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{localStorage.getItem("role") === "employer" && navList}</div>
                    <div className="flex items-center gap-x-1">
                        <CustomButton
                            containerClassNames="w-[150px] hidden lg:inline-block"
                            label="Log out"
                            onClick={handleLogout}
                        />
                    </div>
                    <IconButton
                        placeholder={undefined}
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <Collapse open={openNav}>
                <div className="flex flex-col gap-2">
                    {localStorage.getItem("role") === "employer" && navList}
                    <div className="flex items-center gap-x-1">
                        <CustomButton
                            containerClassNames="w-full"
                            label="Log out"
                            onClick={handleLogout}
                        />
                    </div>
                </div>
            </Collapse>
        </Navbar>
    );
}