import Image from 'next/image'
import React from 'react'

const CareGiverCard = ({careGiver}) => {
  return (
    <div className="card shadow mx-auto cursor-pointer group transition-all hover:shadow-lg">
      <div className="img flex justify-center h-[250px] overflow-hidden">
        <Image src={careGiver.image} alt="Care Givers" width={600} height={250} className="rounded rounded-b-none object-cover group-hover:scale-125 transition-all" />
      </div>
      <div className="info mt-5 px-5 pb-5">
        <h3 className="text-xl font-medium text-center sm:text-start group-hover:text-green-400 transition-all">{careGiver.name}</h3>
        <h5 className='text-slate-400 mb-3 text-center sm:text-start'>{careGiver.profession}</h5>
        <p className="text-justify">{careGiver.description}</p>
      </div>
    </div>
  );
}

export default CareGiverCard