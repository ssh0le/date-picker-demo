export interface HolidayResponse {
    response: {
        holidays: Holiday[]
    }
}

export interface Holiday {
    name: string,
    date: HolidayDate,
}
export interface HolidayDate {
    datetime: Datetime
}

export interface Datetime {
    month: number
    day: number
}