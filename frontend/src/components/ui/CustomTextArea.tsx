import { Textarea } from "@material-tailwind/react";

interface CustomTextAreaProps {
    label: string;
    required?: boolean;
    classNames?: string;
    name?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number

}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
    label,
    required = false,
    classNames,
    name,
    value,
    onChange,
    rows = 5,
}) => {

    return <Textarea
        required={required}
        label={label}
        variant="outlined"
        color="purple"
        className={`${classNames} z-[5]`}
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
    />

}

export default CustomTextArea