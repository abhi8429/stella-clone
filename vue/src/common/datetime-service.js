import {closeFriend} from '@/properties/close-friend'
import moment from 'moment'

export const ISOToDate = (isoDate) => {
  return moment(isoDate).format(closeFriend['DateFormat.Date']);
}

export const ISOToDateTime = (isoDate) => {
  return moment(isoDate).format(closeFriend['DateFormat.DateTime']);
}

export const dateToISO = (date) => {
  if (isValidDate(date)) {
    return moment(date, closeFriend['DateFormat.Date']).toISOString();
  } else {
    return date;
  }
}

export const isValidDate = (dateStr) => {
  return moment(dateStr, closeFriend['DateFormat.Date']).isValid();
};


export const javaLocalTimeToHourMin = (javaLocalTime) => {
  if (javaLocalTime) {
    return javaLocalTime.substring(0, 5);
  } else {
    return '';
  }
}

export const isValidTime = (time) => {
  return moment(time, closeFriend['Time.Format'], true).isValid();
}

export const timeSince = (date) => {
  if (!(date instanceof Date)) {
    // date = Date.parse(date);
    let utcDate = moment.utc(date, "YYYY-MM-DD HH:mm");
    date = utcDate.local().toDate();
  }
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return since(Math.floor(interval), "year");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return since(Math.floor(interval), "months");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return since(Math.floor(interval), "day");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return since(Math.floor(interval), "hour");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return since(Math.floor(interval), "minute");
  }

  return since(Math.floor(seconds), 'second');
}

const since = (value, timeUnit) => {
  return (value > 1 ? value + ` ${timeUnit}s` : value + ` ${timeUnit}`);
}


