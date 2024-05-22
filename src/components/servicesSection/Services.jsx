import {services} from './servicesData'
import ServiceCard from './serviceCard/ServiceCard';


const Services = () => {
  return (
    <section className="pb-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3">
        <h2 className="text-3xl sm:text-4xl font-medium mb-10 text-center">
          Services
        </h2>
        <div
          className="services grid md:grid-cols-2 gap-6"
        >
            {services.map(service => (
                <ServiceCard key={service.id} service={service} />
            ))}
          
        </div>
      </div>
    </section>
  );
}

export default Services