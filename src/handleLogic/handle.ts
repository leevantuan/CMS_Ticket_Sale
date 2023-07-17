export const HandleDates = (dateTimes: Date): string => {
  const day: string = dateTimes.getDate().toString();
  const month: string = (dateTimes.getMonth() + 1).toString();
  const year = dateTimes.getFullYear();

  if (day.length < 2) {
    if (month.length < 2) {
      return `0${day}/0${month}/${year}`;
    }
    return `0${day}/${month}/${year}`;
  } else if (month.length < 2) {
    return `${day}/0${month}/${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};
export const HandleTimes = (dateTimes: Date): string => {
  const hrs: string = dateTimes.getHours().toString();
  const mm: string = dateTimes.getMinutes().toString();
  const sc: string = dateTimes.getSeconds().toString();

  if (hrs.length < 2) {
    if (mm.length < 2) {
      if (sc.length < 2) {
        return `0${hrs}:0${mm}:0${sc}`;
      }
      return `0${hrs}:0${mm}:${sc}`;
    }
    return `0${hrs}:${mm}:${sc}`;
  } else if (mm.length < 2) {
    if (sc.length < 2) {
      return `${hrs}:0${mm}:0${sc}`;
    }
    return `${hrs}:0${mm}:${sc}`;
  } else if (sc.length < 2) {
    return `${hrs}:${mm}:0${sc}`;
  }
  return `${hrs}:${mm}:${sc}`;
};
export const HandleCheckUpdateService = (combo: number, price: number) => {
  if (price === 0 && combo !== 0) {
    return ['1'];
  } else if (price !== 0 && combo === 0) {
    return ['2'];
  } else if (price !== 0 && combo !== 0) {
    return ['1', '2'];
  } else {
    return [];
  }
};
export const HandleStateService = (state: boolean) => {
  if (state === true) {
    return '1';
  } else {
    return '0';
  }
};
export const ConvertToTimestamp = (date: string, time: string) => {
  const str = `${date} ${time}`;

  const [dateComponents, timeComponents] = str.split(' ');

  const [day, month, year] = dateComponents.split('/');
  const setMonth: number = +month;
  const [hours, minutes, seconds] = timeComponents.split(':');

  const newDate = new Date(+year, setMonth - 1, +day, +hours, +minutes, +seconds);

  const timestamp = newDate.getTime();
  return newDate;
};
export const SoSanhDate = (date: string, dateNow: string, time: string, timeNow: string) => {
  const [setDay, setMonth, setYear] = date.split('/');
  const [setDayNow, setMonthNow, setYearNow] = dateNow.split('/');
  const setTime = time.split(':');
  const setTimeNow = timeNow.split(':');
  const day: number = +setDay;
  const month: number = +setMonth;
  const year: number = +setYear;
  const dayNow: number = +setDayNow;
  const monthNow: number = +setMonthNow;
  const yearNow: number = +setYearNow;
  const hours: number = +setTime[0];
  const hoursNow: number = +setTimeNow[0];

  if (year > yearNow) {
    return true;
  } else if (year === yearNow) {
    if (month > monthNow) {
      return true;
    } else if (month === monthNow) {
      if (day > dayNow) {
        return true;
      } else if (day === dayNow) {
        if (hours > hoursNow) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const SoSanhDateTicket = (date: string, dateNow: string) => {
  const [setDay, setMonth, setYear] = date.split('/');
  const [setDayNow, setMonthNow, setYearNow] = dateNow.split('/');
  const day: number = +setDay;
  const month: number = +setMonth;
  const year: number = +setYear;
  const dayNow: number = +setDayNow;
  const monthNow: number = +setMonthNow;
  const yearNow: number = +setYearNow;

  if (year > yearNow) {
    return true;
  } else if (year === yearNow) {
    if (month > monthNow) {
      return true;
    } else if (month === monthNow) {
      if (day > dayNow) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
