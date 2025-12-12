import { differenceInDays, addDays, format, startOfMonth, endOfMonth, getDaysInMonth } from 'date-fns';

export const calculateBiorhythm = (birthDate, targetDate) => {
    const daysLived = differenceInDays(targetDate, birthDate);

    return {
        date: targetDate,
        formattedDate: format(targetDate, 'd.MM'),
        dayOfWeek: format(targetDate, 'eee'), // Mon, Tue...
        physical: Math.sin(2 * Math.PI * daysLived / 23),
        emotional: Math.sin(2 * Math.PI * daysLived / 28),
        intellectual: Math.sin(2 * Math.PI * daysLived / 33),
        critical: false // Logic to be added if needed (crossing zero)
    };
};

export const generateMonthData = (birthDate, targetMonthDate) => {
    const start = startOfMonth(targetMonthDate);
    const end = endOfMonth(targetMonthDate);
    const days = [];

    let current = start;
    while (current <= end) {
        days.push(calculateBiorhythm(birthDate, current));
        current = addDays(current, 1);
    }
    return days;
};
