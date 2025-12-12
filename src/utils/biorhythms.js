import { differenceInDays, addDays, format, startOfMonth, endOfMonth, getDaysInMonth } from 'date-fns';

export const calculateBiorhythm = (birthDate, targetDate) => {
    const daysLived = differenceInDays(targetDate, birthDate);

    const physical = Math.sin(2 * Math.PI * daysLived / 23);
    const emotional = Math.sin(2 * Math.PI * daysLived / 28);
    const intellectual = Math.sin(2 * Math.PI * daysLived / 33);

    const sum = physical + emotional + intellectual;
    const average = sum / 3;

    let status = '';
    let color = '';
    let barHeight = 0;

    if (sum >= 1.5) {
        status = 'Отлично';
        color = '#00FF00';
        barHeight = 1.2; // Fixed height, scaled for chart
    } else if (sum >= 0) {
        status = 'Хорошо';
        color = '#90EE90';
        barHeight = 0.6; // Fixed height, scaled
    } else if (sum > -1.5) {
        status = 'Плохо';
        color = '#FF6347';
        barHeight = -0.6; // Fixed height, scaled
    } else {
        status = 'Совсем плохо';
        color = '#8B0000';
        barHeight = -1.2; // Fixed height, scaled
    }

    return {
        date: targetDate,
        formattedDate: format(targetDate, 'd.MM'),
        dayOfWeek: format(targetDate, 'eee'), // Mon, Tue...
        physical,
        emotional,
        intellectual,
        emotional,
        intellectual,
        average,
        sum,
        status,
        color,
        barHeight
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
