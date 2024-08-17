import React from 'react'
import { accessibilityFeaturesData } from './accessibilityFeaturesData';
import AccessibilityFeaturesCard from './accessibilityFeaturesCard/AccessibilityFeaturesCard';

const AccessibilityFeaturesSection = () => {
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start">
          Accessibility Features
        </h2>
        <div className="accessibility-features grid gap-6" style={{gridTemplateColumns:"repeat(auto-fit,minmax(18rem,1fr))"}}>
          {accessibilityFeaturesData.map((item) => (
            <AccessibilityFeaturesCard key={item.id} accessibilityData={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AccessibilityFeaturesSection