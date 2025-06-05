import React from 'react'

const DoctorCard = ({img, name}) => {
  return (
  <div className='flex flex-col justify-center items-center gap-4'>
    <img
      className="w-[130px] h-[130px] object-cover"
      src={img}
      alt="Profile Image"
    />
    <p>{name}</p>
  </div>

  )
}

export default DoctorCard