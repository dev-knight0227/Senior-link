import Image from 'next/image';
import React from 'react'

const SocialActivitiesCard = ({activityData}) => {
  return (
    <div className="card shadow rounded mx-auto cursor-pointer group transition-all hover:shadow-lg border-2 border-green-500">
      <div className="img flex justify-center max-h-[300px] overflow-hidden">
        <Image
          src={activityData.image}
          alt="Activity"
          width={600}
          height={250}
          className="rounded rounded-b-none object-cover group-hover:scale-125 transition-all"
        />
      </div>
      <div className="info mt-5 px-3 pb-5">
        <h3 className="text-lg font-medium text-center sm:text-start group-hover:text-green-400 transition-all mb-2">
          {activityData.title}
        </h3>
        <p className="text-justify">{activityData.description}</p>
      </div>
    </div>
  );
}

export default SocialActivitiesCard