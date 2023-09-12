import React, { ChangeEvent, FC, Fragment, memo } from "react";

interface RadioProps {
    options: string[] | number[];
    onChange: (item: number) => void;
    title: string;
    value: string | number;
}

const Radio: FC<RadioProps> = ({ options, onChange, title, value }) => {
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };

    return (
        <div className='radio'>
            <p>{title}</p>
            {options.map((option, index) => (
                <Fragment key={index}>
                    <input
                        type='radio'
                        name={String(option)}
                        id={String(option + title)}
                        value={index}
                        checked={index === value}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor={String(option + title)}>{option}</label>
                </Fragment>
            ))}
        </div>
    );
};

export default memo(Radio, (prevProps, nextProps) => prevProps.value === nextProps.value);
