import PrimaryButton from '../primaryButton/PrimaryButton'
import styles from './hero.module.css'

const Hero = () => {
  return (
    <section className={`${styles.bg} mt-16`}>
      <div className="container mx-auto px-3 py-32">
        <div className="content text-center md:text-start md:w-9/12 lg:w-1/2">
          <h1 className='text-4xl mb-5 md:mb-8 text-slate-100 font-semibold md:text-5xl lg:text-6xl'>Stay Comfortably Like Your Home</h1>
          <p className='mb-5 font-light md:md-8 text-slate-300'>
            Lorem ipsum dolor sit amet consectetur. Mattis aenean quis cursus
            consectetur tortor facilisis vulputate.
          </p>
          <PrimaryButton>Get In Touch</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

export default Hero