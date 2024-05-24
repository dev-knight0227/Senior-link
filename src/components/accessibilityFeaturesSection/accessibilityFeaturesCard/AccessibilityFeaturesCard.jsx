import React from 'react'

const AccessibilityFeaturesCard = ({accessibilityData}) => {
    const {icon,title,description} = accessibilityData
  return (
    <div
      className="card rounded transition-all hover:shadow-xl p-5 bg-slate-100 dark:bg-slate-500"
    >
      <div className="icon w-10 h-10 flex justify-center items-center bg-green-400 text-white mb-5 rounded">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl mb-2 font-medium">{title}</h3>
      <p className="font-light text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}

export default AccessibilityFeaturesCard