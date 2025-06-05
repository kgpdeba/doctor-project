import React from 'react'
import { Calendar } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Month = () => {
  return (
    <Calendar
    fullscreen={false}
    headerRender={({ value, onChange }) => {
      const current = value.clone();

      const prevMonth = () => {
        const newVal = current.subtract(1, 'month');
        onChange(newVal);
      };

      const nextMonth = () => {
        const newVal = current.add(1, 'month');
        onChange(newVal);
      };

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            marginBottom: 8,
          }}
        >
          <LeftOutlined onClick={prevMonth} style={{ cursor: 'pointer' }} />
          <div style={{ fontWeight: '500' }}>
            {value.format('MMMM YYYY')}
          </div>
          <RightOutlined onClick={nextMonth} style={{ cursor: 'pointer' }} />
        </div>
      );
    }}
  />
  )
}

export default Month