import { TrashIcon } from "@heroicons/react/16/solid";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Employee, getEmployees } from "../../api/users.requests";
import AddNewEmployee from "../dialogs/AddNewEmployee";

const TABLE_HEAD = ["Name", "Email", ""];

type TableState = "loading" | "success" | "error";

const EmployeesTable = () => {

    const [employees, setEmployees] = useState<Employee[]>([])
    const [tableState, setTableState] = useState<TableState>('success')

    const handleError = () => {
        setTableState("error")
        setTimeout(() => {
            setTableState("success")
        }, 3000);
    }
    const getEmployeesHandler = async () => {
        setTableState("loading")
        try {
            const employeesResponse = await getEmployees()
            if (
                Array.isArray(employeesResponse) &&
                employeesResponse.every((item) => typeof item === "object" && item !== null)
            ) {
                setEmployees(employeesResponse)
            } else {
                setEmployees([])
                handleError()
            }
        } catch (error) {
            handleError()
        } finally {
            setTableState('success')
        }
    }

    const handleNewEmployee = (newEmployee: Employee) => {
        setEmployees((prevEmployees) => [newEmployee, ...prevEmployees])
    }

    useEffect(() => {
        getEmployeesHandler()
    }, [])

    return (
        <Card className="h-full flex min-w-[750px] max-w-[750px] overflow-scroll max-h-[80vh] min-h-[80vh]" placeholder={undefined} >
            {tableState === 'loading' ?
                <Spinner className="h-16 w-16 self-center justify-self-center my-auto" color="purple" />
                :
                employees.length === 0 ?
                    <div className="my-auto flex flex-col w-full items-center justify-center gap-5">
                        <Typography className="self-center justify-self-center text-purple-500" placeholder={undefined}>No Employees Found</Typography>
                        <AddNewEmployee buttonLabel="Add your first employee" handleNewEmployee={handleNewEmployee} buttonWidth="max-w-[50px]" />
                    </div>
                    :
                    <table className="min-w-[750px] max-w-[750px] table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70" placeholder={undefined}
                                        >
                                            {
                                                head === '' ?
                                                    <AddNewEmployee buttonLabel="Add employee" buttonWidth="max-w-[150px]" handleNewEmployee={handleNewEmployee} />
                                                    :
                                                    head
                                            }
                                        </Typography>

                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {

                                employees.map(({ name, email }, index) => {
                                    const isLast = index === employees.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal max-w-[250px] min-w-[250px] truncate" placeholder={undefined}
                                                >
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal max-w-[250px] min-w-[250px] truncate" placeholder={undefined}
                                                >
                                                    {email}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-medium max-w-[250px] min-w-[250px] truncate flex" placeholder={undefined}                                    >
                                                    <TrashIcon className="text-red-500 justify-self-center w-5 h-5 hover:scale-105" />
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
            }
        </Card>
    )
}

export default EmployeesTable