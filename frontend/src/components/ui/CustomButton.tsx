import { Button, Spinner } from "@material-tailwind/react"
import PropTypes from 'prop-types'
import { ReactNode } from "react";

interface CustomButtonProps {
    label: string | ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    classes?: string;
    loading?: boolean;
    disabled?: boolean,
    containerClassNames?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, classes, loading = false, disabled = false, containerClassNames }) => {
    return (
        <div className={`w-[400px] ${containerClassNames}`}>
            <Button
                variant="filled"
                onClick={onClick}
                fullWidth
                color="purple"
                className={`rounded-sm ${classes}`}
                disabled={disabled}
                placeholder={undefined}    >
                {loading ? <Spinner className="m-auto max-h-fit" /> : label}
            </Button>
        </div>
    )
}

CustomButton.propTypes = {
    label: PropTypes.string.isRequired,
};

export default CustomButton
