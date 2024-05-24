import React from 'react'
import IndoorOutdoorCard from './indoorOutdoorCard/IndoorOutdoorCard'

const IndoorOutdoorItem = ({item}) => {
    const {title,items} = item
  return (
    <div>
        <h3 className='text-2xl md:text-3xl font-medium mb-5 text-green-400'>{title}</h3>
        <div className="cards grid gap-8 grid-cols-1 lg:grid-cols-2">
            {items.map(item=>(
                <IndoorOutdoorCard key={item.cardId} cardData={item} />
            ))}
        </div>
    </div>
  )
}

export default IndoorOutdoorItem