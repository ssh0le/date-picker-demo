import React, { ChangeEvent, FC, memo } from "react";

interface SelectProps {
    options: { [key: string | number]: string };
    onChange: (key: number) => void;
    value: number;
}

const Select: FC<SelectProps> = (props) => {
    const { options, onChange, value } = props;

    const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onChange(Number(value));
    };
    return (
        <select name='' id='' value={value} onChange={handleOnChange}>
            {Object.keys(options)
                .filter((option) => !isNaN(Number(option) - 0))
                .map((key) => (
                    <option key={key} value={key}>
                        {options[key]}
                    </option>
                ))}
        </select>
    );
};

export default memo(Select, (prev, next) => prev.value === next.value);
