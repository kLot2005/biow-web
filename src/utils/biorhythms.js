import { differenceInCalendarDays, getDaysInMonth, startOfMonth, addDays, format, addMonths } from 'date-fns';

export const calculateBiorhythm = (birthDate, targetDate) => {
    // t - number of days lived from birth to target date
    // differenceInCalendarDays handles leap years correctly by counting actual calendar days
    const t = differenceInCalendarDays(targetDate, birthDate);

    // Formula: B(t) = sin(2 * PI * t / P) * 100%
    const pi = Math.PI;

    const physical = Math.sin((2 * pi * t) / 23) * 100;
    const emotional = Math.sin((2 * pi * t) / 28) * 100;
    const intellectual = Math.sin((2 * pi * t) / 33) * 100;
    const mathIntegral = (physical + emotional + intellectual) / 3;
    const integral = mathIntegral;

    // Determine status and color based on integral (average)
    // Using thresholds similar to HEAD chart logic or incoming logic adapted to %
    // -100 to 100 scale.
    // Incoming used: > 1.5 (on 3 sum) => > 50% avg.
    // Chart used: > 40%
    // I will use > 40% to match the chart.

    let status = '';
    let color = '';

    if (integral > 40) {
        status = 'Отлично';
        color = '#69f0ae';
    } else if (integral >= 0) {
        status = 'Хорошо';
        color = '#2e7d32';
    } else if (integral > -40) {
        status = 'Плохо';
        color = '#c62828';
    } else {
        status = 'Совсем плохо';
        color = '#ff5252';
    }

    return {
        date: targetDate,
        formattedDate: format(targetDate, 'd.MM'),
        dayOfWeek: format(targetDate, 'eee'),
        physical,
        emotional,
        intellectual,
        integral,
        status,
        color,
        daysLived: t
    };
};

export const generateMonthData = (birthDate, monthDate) => {
    const start = startOfMonth(monthDate);
    const daysInMonth = getDaysInMonth(monthDate);
    const data = [];

    for (let i = 0; i < daysInMonth; i++) {
        const currentDate = addDays(start, i);
        const biorhythms = calculateBiorhythm(birthDate, currentDate);

        data.push({
            date: currentDate.toISOString(),
            formattedDate: format(currentDate, 'd.MM'),
            physical: biorhythms.physical,
            emotional: biorhythms.emotional,
            intellectual: biorhythms.intellectual,
            integral: biorhythms.integral,
            fullDate: format(currentDate, 'dd.MM.yyyy')
        });
    }

    return data;
};

export const generateMultipleMonthsData = (birthDate, startMonth, numberOfMonths = 3) => {
    const monthsData = [];

    for (let i = 0; i < numberOfMonths; i++) {
        const actualMonth = addMonths(startMonth, i);
        const monthData = generateMonthData(birthDate, actualMonth);
        const monthName = format(actualMonth, 'LLLL yyyy');

        monthsData.push({
            month: actualMonth,
            monthName: monthName,
            data: monthData
        });
    }

    return monthsData;
};
