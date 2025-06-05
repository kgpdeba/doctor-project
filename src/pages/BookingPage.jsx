import React from 'react';
import Month from '../components/Month';
import Time from '../components/Time';
import Form from '../components/Form';

const BookingPage = () => {
  return (
    <div className="p-4 flex justify-evenly items-start mt-20">

      <div>
        <h2 className='text-3xl mb-6 text-center font-semibold'>Choose Date</h2>
        <div
          style={{
            width: '350px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Month />
        </div>
      </div>

      <div className='flex flex-col gap-10'>
        <div >
          <h2 className='text-3xl mb-6 font-semibold'>Choose Time</h2>
          <p className='text-xl mb-10 text-gray-500'>Set time by clicking the following:</p>
          <Time />
        </div>

        <Form />

      </div>



    </div>
  );
};

export default BookingPage;
