import { Input } from "@material-tailwind/react";
import PropTypes from 'prop-types'
interface CustomTextInputProps {
    label: string;
    required?: boolean;
    classNames?: string;
    containerClassNames?: string;
    type?: string;
    icon?: any,
    name?: string,
    value?: string,
    error?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const CustomInput: React.FC<CustomTextInputProps> = ({
    label,
    required = false,
    classNames,
    containerClassNames,
    type = "string",
    icon,
    name,
    value,
    error = false,
    onChange,

}) => {


    return (
        <div className={`w-[400px] ${containerClassNames}`}>
            <Input
                required={required}
                label={label}
                variant="outlined"
                color="purple"
                type={type}
                className={`${classNames}`} 
                crossOrigin={undefined}
                icon={icon ? icon : undefined}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
            />
        </div>

    )

}

CustomInput.propTypes = {
    label: PropTypes.string.isRequired,
};

export default CustomInput