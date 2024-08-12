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