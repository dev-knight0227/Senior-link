import styles from "./serviceCard.module.css"
const ServiceCard = ({service}) => {
    const {icon,title,description} = service
  return (
    <div
      className={`${styles.card} rounded transition-all hover:shadow-xl p-5`}
    >
      <div className="icon w-10 h-10 flex justify-center items-center bg-green-400 text-white mb-5 rounded">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl mb-2 font-medium">{title}</h3>
      <p className="font-light text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default ServiceCard