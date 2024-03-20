const addDaysToDate = (isoDateString, daysToAdd) => {
    const date = new Date(isoDateString);

    if (Number.isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }

    date.setDate(date.getDate() + daysToAdd);

    return date.toISOString();
};

module.exports = { addDaysToDate };
