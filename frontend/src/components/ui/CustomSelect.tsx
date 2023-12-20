import { Select, Option } from "@material-tailwind/react"

interface options {
    label: string;
    value: string;
}

interface CustomSelectProps {
    label: string;
    options: options[];
    onChange: (value: string | undefined) => void;
    value: string | undefined;
    classNames?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, label, onChange, value, classNames }) => {
    return <div className={`${classNames}`}>
        <Select
            placeholder={undefined}
            variant="outlined"
            label={label}
            onChange={(e) => onChange(e)}
            className={`z-[999]`}
            value={value}
        >
            {options.map((option, index) => (
                <Option
                    key={index}
                    value={option.value}
                    className="text-black "
                >
                    {option.label}
                </Option>
            ))}
        </Select>
    </div>


}

export default CustomSelect