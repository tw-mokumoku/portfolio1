export function timeDiff(t, postDay) {
    let diff = new Date().getTime() - postDay.getTime();
    let progress = new Date(diff);
    if (progress.getUTCFullYear() - 1970) {
        if (progress.getUTCFullYear() - 1970 == 1) return progress.getUTCFullYear() - 1970 + t('DateCalc.timeDiff.yearAgo');
        return progress.getUTCFullYear() - 1970 + t('DateCalc.timeDiff.yearsAgo');
    } else if (progress.getUTCMonth()) {
        return progress.getUTCMonth() + t('DateCalc.timeDiff.monthAgo');
    } else if (progress.getUTCDate() - 1) {
        if (progress.getUTCDate() - 1 == 1) return progress.getUTCDate() - 1 + t('DateCalc.timeDiff.dayAgo');
        return progress.getUTCDate() - 1 + t('DateCalc.timeDiff.daysAgo');
    } else if (progress.getUTCHours()) {
        if (progress.getUTCHours() == 1) return progress.getUTCHours() + t('DateCalc.timeDiff.hourAgo');
        return progress.getUTCHours() + t('DateCalc.timeDiff.hoursAgo');
    } else if (progress.getUTCMinutes()) {
        if (progress.getUTCMinutes() == 1) return progress.getUTCMinutes() + t('DateCalc.timeDiff.minuteAgo');
        return progress.getUTCMinutes() + t('DateCalc.timeDiff.minutesAgo');
    } else {
        if (progress.getUTCSeconds() == 1) return progress.getUTCSeconds() + t('DateCalc.timeDiff.secondAgo');
        return progress.getUTCSeconds() + t('DateCalc.timeDiff.secondsAgo');
    }
}

export function monthStartEpoch() {
    // ¡Œ‚Ì00•ª0•b‚Ìepoch‚ÌZoB
    var month_start = new Date();
    month_start.setMonth(month_start.getMonth());
    month_start.setDate(1);
    month_start.setHours(0, 0, 0, 0);
    var month_start_epoch = (month_start.getTime() / 1000);
    return month_start_epoch;
}
export function monthEndEpoch() {
    // ¡Œ‚ÌI“ú‚Ì2359•ª59•b‚Ìepoch‚ÌZoB
    var month_end = new Date();
    month_end.setMonth(month_end.getMonth() + 1);
    month_end.setDate(0);
    month_end.setHours(23, 59, 59, 0);
    var month_end_epoch = (month_end.getTime() / 1000);
    return month_end_epoch;
}
export function weekStartEpoch() {
    // ¡T‚Ì00•ª0•b‚Ìepoch‚ÌZoB
    var week_start = new Date();
    week_start.setDate(week_start.getDate() - week_start.getDay() + 1);
    week_start.setHours(0, 0, 0, 0);
    var week_start_epoch = Math.floor(week_start.getTime() / 1000);
    return week_start_epoch;
}
export function weekEndEpoch() {
    // ¡T‚Ì2359•ª59•b‚Ìepoch‚ÌZoB
    var week_end = new Date();
    week_end.setDate(week_end.getDate() - week_end.getDay() + 7);
    week_end.setHours(23, 59, 59, 0);
    var week_end_epoch = Math.floor(week_end.getTime() / 1000);
    return week_end_epoch;
}
export function dayStartEpoch() {
    // –{“ú‚Ì00•ª0•b‚Ìepoch‚ÌZoB
    var today_start = new Date();
    today_start.setHours(0, 0, 0, 0);
    today_start.setDate(today_start.getDate());
    var today_start_epoch = (today_start.getTime() / 1000);
    return today_start_epoch;
}
export function dayEndEpoch() {
    // –{“ú‚Ì2359•ª59•b‚Ìepoch‚ÌZoB
    var today_end = new Date();
    today_end.setHours(23, 59, 59, 0);
    today_end.setDate(today_end.getDate());
    var today_end_epoch = (today_end.getTime() / 1000);
    return today_end_epoch;
}