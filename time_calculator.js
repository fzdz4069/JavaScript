// Calculates time of arrival (in 12-hour format) based on time of departure and duration.
// A day of the week is accepted as an optional argument.

const addTime = (startTime, duration, startDay) => {
  let hourMinute = startTime.split(" ")[0];
  let ampm = startTime.split(" ")[1];
  let hour = Number(hourMinute.split(":")[0]);
  let minute = Number(hourMinute.split(":")[1]);
  let durHour = Number(duration.split(":")[0]);
  let durMinute = Number(duration.split(":")[1]);
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  let n = 0;

  if (hour === 12 && ampm === "AM") {
    hour = 0;
  } else if (hour < 12 && ampm == "PM") {
    hour += 12;
  };
  ampm = "";

  let endMinute = minute + durMinute;
  if (endMinute >= 60) {
    endMinute -= 60;
    hour += 1;
  };
while (durHour >= 24) {
    n += 1;
    durHour -= 24;
  };
  let endHour = hour + durHour;
  while (endHour >= 24) {
    endHour -= 24;
    n += 1;
  };

  if (endHour <= 11 && endHour > 0) {
    ampm = "AM";
  } else if (endHour === 0) {
    ampm = "AM";
    endHour = 12;
  } else if (endHour === 12) {
    ampm = "PM";
  } else if (endHour > 12) {
    ampm = "PM";
    endHour -= 12;
  };
  let endTime;
  let endDay;
  if (endMinute < 10) {
    endTime = `${endHour}:0${endMinute} ${ampm}`;
  } else {
    endTime = `${endHour}:${endMinute} ${ampm}`;
  };
  if (startDay) {
    let m = days.indexOf(startDay.toLowerCase());
    m += n % 7;
    if (m > 6) {
      m -= 7;
    };
    endDay = days[m];
    if (n === 1) {
      endTime +=  `, ${endDay} (next day)`;
    } else if (n === 0) {
      endTime += `, ${endDay}`
    } else if (n > 1) {
      endTime += `, ${endDay} (${n} days later)`;
    };
  } else {
    if (n === 1) {
      endTime += ' (next day)';
    } else if (n > 1) {
      endTime += ` (${n} days later)`;
    };
  };
  return endTime;
};

console.log(addTime("9:30 AM", "1:28", "saturday"));
console.log(addTime("8:56 PM", "14:08"));
console.log(addTime("12:00 AM", "24:05", "thursday"));
console.log(addTime("12:15 AM", "176:00", "Sunday"));
console.log(addTime("12:00 PM", "12:00", "thursday"));
console.log(addTime("11:57 PM", "48:04", "thursday"));
