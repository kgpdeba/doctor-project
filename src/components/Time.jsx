
import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setTime } from '../features/BookingSlice';

const format = 'HH:mm';


const Time = () => {

    const time = useSelector((state)=>state.app.time)
    const dispatch=useDispatch()

  const handleChange = (time, timeString) => {    
    console.log("Selected Time (formatted string):", timeString); 
    dispatch(setTime(timeString))
  };

  return (
    <TimePicker
      defaultValue={dayjs('12:00', format)}
      format={format}
      onChange={handleChange}
    />
  );
};

export default Time;
