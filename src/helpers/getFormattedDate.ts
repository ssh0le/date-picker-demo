export const getFormattedDate = (date: Date | null | undefined): string => {
    if (!date) {
        return 'not setted'
    }
    const formatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', day: 'numeric' });
    return formatter.format(date);
};