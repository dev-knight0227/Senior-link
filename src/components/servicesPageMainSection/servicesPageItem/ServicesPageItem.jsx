import React from 'react'

const ServicesPageItem = ({data}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
      <div className="info flex-[3]">
        <h3 className='text-2xl font-medium mb-3 text-green-400'>{data.title}</h3>
        <p className="shortDesc">{data.shortDesc}</p>
        <h4 className="text-xl text-slate-500 dark:text-slate-400 font-medium mt-5 mb-2">Service Details</h4>
        <p>{data.details}</p>
      </div>
      <div className="offerings flex-[1]">
        <h3 className='text-xl font-medium mb-2'>Service Offerings</h3>
        <ul className='flex flex-col gap-2'>
          {data.serviceOfferings.map((item) => (
            <li key={item.id}>{item.offer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServicesPageItem