import { DatePicker } from "@richigo/date-picker-lib";
import React, { FC, memo, useState } from "react";

const SelectDate: FC<{
    onSelect: (day: Date | undefined) => void;
    title: string;
    initialDate: Date | undefined;
}> = ({ onSelect, title, initialDate }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedDay, setSelectedDate] = useState<Date | null>(null);

    const handleOpenButtonClick = () => {
        setIsOpen((prevOpen) => !prevOpen);
    };

    const handleSelectDate = () => {
        if (selectedDay) {
            onSelect(selectedDay);
            setIsOpen(false);
        }
    };

    const handleClearClick = () => {
        onSelect(undefined);
    };

    return (
        <div className='select-date'>
            <span>{title}</span>
            <button onClick={handleOpenButtonClick}>{isOpen ? 'Close' : 'Select date'}</button>
            <button onClick={handleClearClick}>Clear</button>
            {isOpen && (
                <div className="select-date-picker">
                    <DatePicker
                        onSelect={setSelectedDate}
                        initialDate={initialDate}
                    />
                    {selectedDay !== null && selectedDay !== undefined && (
                        <button
                            onClick={handleSelectDate}
                            className='apply-select-date'
                        >
                            Apply
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(SelectDate);
