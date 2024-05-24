import React from 'react'
import { careGivers } from './careGiversData'
import CareGiverCard from './careGiverCard/CareGiverCard'

const CareGivers = () => {
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium text-center">
          Meet Our Care Givers
        </h2>
        <div
          className="care-givers mt-10 grid gap-8 justify-center"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(15rem,1fr))" }}
        >
          {careGivers.map((careGiver) => (
            <CareGiverCard key={careGiver.id} careGiver={careGiver} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareGivers