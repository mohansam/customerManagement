const addDaysToDate = (isoDateString, daysToAdd) => {
    const date = new Date(isoDateString);

    if (Number.isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }

    const numberOfDays = parseInt(daysToAdd, 10);

    if (Number.isNaN(numberOfDays)) {
        throw new Error('Invalid number to add');
    }

    date.setDate(date.getDate() + numberOfDays);

    return date.toISOString();
};

module.exports = { addDaysToDate };
