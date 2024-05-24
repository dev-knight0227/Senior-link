import React from 'react'
import { indoorOutdoorData } from './indoorOutdoorData'
import IndoorOutdoorItem from './indoorOutdoorItems/IndoorOutdoorItem'

const IndoorOutdoorSection = () => {
  return (
    <section className="py-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3 flex flex-col gap-16">
        
        {indoorOutdoorData.map(item =>(
            <IndoorOutdoorItem key={item.id} item={item} />
        ))}
        
        </div></section>
  )
}

export default IndoorOutdoorSection