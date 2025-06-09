import React, { useEffect, useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setTime } from '../features/BookingSlice';
import axios from 'axios';

const format = 'HH:mm';

const Time = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.app.date);
  const docId = useSelector((state) => state.app.docId);

  const [bookedTimes, setBookedTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (!date || !docId) return;

    const fetchBookedTimes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/patients', {
          params: {
            docId,
            date,
          },
        });

        const times = response.data.map((booking) => booking.time);
        setBookedTimes(times);
      } catch (error) {
        console.error('Failed to fetch booked times:', error);
        setBookedTimes([]);
      }
    };

    fetchBookedTimes();
    setSelectedTime(null);
    dispatch(setTime(null));
  }, [date, docId]);

  const disabledTime = () => {
    const now = dayjs();
    const selectedDate = dayjs(date, 'MMM DD YYYY');

    const timeMap = {};
    bookedTimes.forEach((time) => {
      if (!time || typeof time !== 'string' || !time.includes(':')) return;
      const [hourStr, minuteStr] = time.split(':');
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      if (!timeMap[hour]) timeMap[hour] = [];
      timeMap[hour].push(minute);
    });

    const fullyBookedHours = Object.entries(timeMap)
      .filter(([, minutes]) => [0, 15, 30, 45].every((min) => minutes.includes(min)))
      .map(([hour]) => parseInt(hour, 10));

    const disabledHours = () => {
      if (selectedDate.isSame(now, 'day')) {
        const pastHours = Array.from({ length: now.hour() }, (_, i) => i);
        return [...new Set([...fullyBookedHours, ...pastHours])];
      }
      return fullyBookedHours;
    };

    const disabledMinutes = (selectedHour) => {
      const booked = timeMap[selectedHour] || [];

      if (selectedDate.isSame(now, 'day') && selectedHour === now.hour()) {
        const currentQuarter = Math.floor(now.minute() / 15) * 15;
        const pastMinutes = [0, 15, 30, 45].filter((min) => min <= currentQuarter);
        return [...new Set([...booked, ...pastMinutes])];
      }

      return booked;
    };

    return {
      disabledHours,
      disabledMinutes,
    };
  };

  const handleChange = (time, timeString) => {
    setSelectedTime(time);
    dispatch(setTime(timeString));
  };

  return (
    <TimePicker
      format={format}
      value={selectedTime}
      onChange={handleChange}
      disabledTime={disabledTime}
      minuteStep={15}
      placeholder="Select Time"
      allowClear
    />
  );
};

export default Time;
