import EmployeesTable from "../components/tables/EmployeesTable"
import { StickyNavbar } from "../components/ui"

const EmployeesPage = () => {
    return (
        <div className="flex flex-col items-center">
            <StickyNavbar />
            <div className="z-[998] flex justify-center items-center min-h-[calc(100vh-70px)] max-w-[calc(100%-20px)] min-w-[calc(100%-20px)] ">

                <EmployeesTable />
            </div>

        </div>
    )
}

export default EmployeesPage