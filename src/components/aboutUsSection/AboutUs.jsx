import Image from 'next/image'
import AboutUsImg from '../../../public/about-us.png'
import { MdLibraryAddCheck } from "react-icons/md";
import PrimaryButton from '../primaryButton/PrimaryButton';

const AboutUs = () => {
  return (
    <section className="py-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3 flex flex-col lg:flex-row lg:items-center gap-10">
        <div className="left flex-1 z-[1] mb-16 flex justify-center lg:justify-start">
          <div className="img-box max-w-[250px] sm:max-w-[450px] relative">
            <div className="hidden sm:block border border-green-400 absolute w-full h-full top-10 left-10 z-[-1]"></div>
            <Image src={AboutUsImg} alt="About Us Image" />
          </div>
        </div>
        <div className="right flex-1 font-light">
          <h2 className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Augue non malesuada placerat
            faucibus nam purus sem. Urna pulvinar porttitor dignissim congue
            pellentesque ac hac.
          </p>
          <ul className="mt-8 flex flex-col gap-2 list-disc list-inside mb-10">
            <li className='flex gap-2 items-center'><MdLibraryAddCheck className="text-green-400 text-lg" /> Lorem ipsum dolor sit amet consectetur. </li>
            <li className='flex gap-2 items-center'><MdLibraryAddCheck className="text-green-400 text-lg" /> Augue non malesuada placerat faucibus nam purus sem. </li>
            <li className='flex gap-2 items-center'><MdLibraryAddCheck className="text-green-400 text-lg" /> 
              Urna pulvinar porttitor dignissim congue pellentesque ac hac.{" "}
            </li>
            <li className='flex gap-2 items-center'><MdLibraryAddCheck className="text-green-400 text-lg" /> Eu adipiscing massa ut proin mauris orci tincidunt ac in.</li>
          </ul>
          <PrimaryButton>Learn More</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

export default AboutUs