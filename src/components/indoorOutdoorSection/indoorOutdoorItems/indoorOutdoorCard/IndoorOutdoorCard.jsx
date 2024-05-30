import Image from 'next/image';
import React from 'react'

const IndoorOutdoorCard = ({cardData}) => {
  return (
    <div className="card shadow rounded mx-auto cursor-pointer group transition-all hover:shadow-lg">
      <div className="img flex justify-center max-h-[300px] overflow-hidden">
        <Image
          src={cardData.image}
          alt="Indoor Outdoor"
          width={800}
          height={250}
          className="rounded rounded-b-none object-cover group-hover:scale-125 transition-all"
        />
      </div>
      <div className="info mt-5 px-3 pb-5">
        <h3 className="text-lg font-medium text-center sm:text-start group-hover:text-green-400 transition-all mb-2">
          {cardData.cardTitle}
        </h3>
        <p className="text-justify">{cardData.description}</p>
      </div>
    </div>
  );
}

export default IndoorOutdoorCard