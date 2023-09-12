import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
    CalendarStyles,
    CalendarViewType,
    DatePicker,
    Holiday as LibHoliday,
    RangeDatePicker,
    WeekStartDay,
} from "@richigo/date-picker-lib";
import Select from "./components/Select";
import SelectDate from "./components/SelectDate";
import { getFormattedDate } from "./helpers/getFormattedDate";
import Radio from "./components/Radio";
import axios from "axios";
import { HolidayResponse } from "./interfaces";

const key = process.env.HOLIDAYS_KEY;
const storageKey = "holidays";

function App() {
    const [currentPicker, setCurrentPicker] = useState<number>(0);
    const [initialDate, setInitialDate] = useState<Date | undefined>(
        new Date()
    );
    const [minDate, setMinDate] = useState<Date | undefined>(undefined);
    const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
    const [viewType, setViewType] = useState<CalendarViewType>(
        CalendarViewType.Month
    );
    const [startDay, setStartDay] = useState<WeekStartDay>(WeekStartDay.Monday);
    const [withTodo, setWithTodo] = useState<boolean>(false);
    const [highlightWeekends, setHighlightWeekends] = useState<boolean>(false);
    const [highlightHolidays, setHighlightHolidays] = useState<boolean>(false);
    const [holidays, setHolidays] = useState<LibHoliday[]>([]);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await axios.get<HolidayResponse>(
                    "https://calendarific.com/api/v2/holidays",
                    {
                        params: {
                            year: "2023",
                            country: "by",
                            api_key: key,
                        },
                    }
                );
                const responseHolidays = response.data.response.holidays.map(
                    ({ name, date: { datetime } }) => {
                        const { day, month } = datetime;
                        return {
                            day,
                            month: month - 1,
                            name,
                        };
                    }
                );
                setHolidays(responseHolidays);
                sessionStorage.setItem(
                    storageKey,
                    JSON.stringify(responseHolidays)
                );
            } catch (error) {
                console.error(error);
            }
        };
        const rawHolidays = sessionStorage.getItem(storageKey);
        if (!rawHolidays) {
            fetchHolidays();
        } else {
            setHolidays(JSON.parse(rawHolidays));
        }
    }, []);

    const handlePickerChange = useCallback((number: number) => {
        setCurrentPicker(number);
    }, []);

    const handleWithTodoChange = (number: number) => {
        setWithTodo(Boolean(number));
    };

    const handleHighlightWeekendsChange = (number: number) => {
        setHighlightWeekends(Boolean(number));
    };

    const handleHighlightHolidaysChange = (number: number) => {
        setHighlightHolidays(Boolean(number));
    };

    const calendarStyle: CalendarStyles = {
        holiday: {
            backgroundColor: "#f93",
            color: "white",
            borderRadius: "2px",
        },
        withTodoDay: {
            borderTopRightRadius: "10px",
            borderBottom: "1px solid black",
        },
        calendar: {},
    };

    return (
        <div className='App'>
            <div className='left'>
                {currentPicker === 0 && (
                    <DatePicker
                        initialDate={initialDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        viewType={viewType}
                        weekStartDay={startDay}
                        withTodo={withTodo}
                        highlightWeekends={highlightWeekends}
                        highlightHolidays={highlightHolidays}
                        holidays={holidays}
                        styles={calendarStyle}
                    />
                )}
                {currentPicker === 1 && (
                    <>
                        <RangeDatePicker
                            initialDate={initialDate}
                            minDate={minDate}
                            maxDate={maxDate}
                            viewType={viewType}
                            weekStartDay={startDay}
                            highlightWeekends={highlightWeekends}
                            highlightHolidays={highlightHolidays}
                            holidays={holidays}
                            styles={calendarStyle}
                        />
                        {withTodo && (
                            <>
                                <br />
                                <span>This picker doesn't support todo</span>
                            </>
                        )}
                    </>
                )}
            </div>
            <div className='right'>
                <SelectDate
                    initialDate={minDate}
                    title={`Min Date: ${getFormattedDate(minDate)}`}
                    onSelect={setMinDate}
                />
                <SelectDate
                    initialDate={maxDate}
                    title={`Max Date: ${getFormattedDate(maxDate)}`}
                    onSelect={setMaxDate}
                />
                <SelectDate
                    initialDate={initialDate}
                    title={`Initial Date: ${getFormattedDate(initialDate)}`}
                    onSelect={setInitialDate}
                />
                Calendar View Type:
                <Select
                    options={
                        CalendarViewType as unknown as { [k: string]: string }
                    }
                    onChange={setViewType}
                    value={viewType}
                />
                Week Start Day
                <Select
                    options={WeekStartDay as unknown as { [k: string]: string }}
                    onChange={setStartDay}
                    value={startDay}
                />
                <Radio
                    options={["Date Picker", "Range Date Picker"]}
                    onChange={handlePickerChange}
                    title={"Picker"}
                    value={currentPicker}
                />
                <Radio
                    options={["Without todo", "With todo"]}
                    onChange={handleWithTodoChange}
                    title={"Todo list"}
                    value={Number(withTodo)}
                />
                <Radio
                    options={["No", "Yes"]}
                    onChange={handleHighlightWeekendsChange}
                    title={"Highlight Weekends"}
                    value={Number(highlightWeekends)}
                />
                <Radio
                    options={["Hide", "Show"]}
                    onChange={handleHighlightHolidaysChange}
                    title={"Highlight Holidays"}
                    value={Number(highlightHolidays)}
                />
            </div>
        </div>
    );
}

export default App;
