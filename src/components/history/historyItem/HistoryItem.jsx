import React from 'react'

const HistoryItem = ({history}) => {
  return (
    <div className='flex gap-4'>
        <p className='py-1.5 font-medium min-w-10'>{history.year}</p>
        <div className="info relative border-s-2 border-slate-600 dark:border-slate-100 px-4 py-1">
            <div className="style absolute left-0 -translate-x-1/2 top-0 w-9 h-9 rounded-full flex justify-center items-center bg-white dark:bg-slate-600"><span className='w-2 h-2 rounded-full bg-green-400'></span></div>
            <h3 className="text-xl font-medium mb-3">{history.title}</h3>
            <p className='text-justify font-light'>{history.description}</p>
        </div>
    </div>
  )
}

export default HistoryItem