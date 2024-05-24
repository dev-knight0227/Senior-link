import React from 'react'
import { socialActivitiesData } from './socialActivitiesData';
import SocialActivitiesCard from './socialActivitiesCard/SocialActivitiesCard';

const SocialActivities = () => {
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium text-center">
          Recreational and Social Activities
        </h2>
        <div
          className="social-activities grid gap-8 mt-10 justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        >
          {socialActivitiesData.map((activityData) => (
            <SocialActivitiesCard
              key={activityData.id}
              activityData={activityData}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialActivities